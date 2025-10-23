// Main Application Logic

// Constants
const DOCUMENT_TYPES = {
    'id_card': 'Teacher ID Card',
    'receipt': 'Salary Receipt',
    'certificate': 'Employment Certificate',
    'transcript': 'Academic Transcript',
    'degree': 'Degree Certificate',
    'course_completion': 'Course Completion Certificate',
    'training': 'Teacher Training Certificate',
    'conference': 'Conference Attendance Certificate',
    // ✅ India Nonprofit certificates
    'nonprofit_12a': '12A Certificate (India)',
    'nonprofit_80g': '80G Certificate (India)',
    'nonprofit_darpan': 'NGO Darpan ID (India)',
    'nonprofit_fcra': 'FCRA Certificate (India)',
    'nonprofit_trust': 'Trust Deed (India)',
    'nonprofit_pan': 'PAN Card (India)',
    // ✅ Western Countries
    'nonprofit_501c3': '501(c)(3) Certificate (USA)',
    'nonprofit_uk': 'UK Charity Registration',
    'nonprofit_canada': 'CRA Certificate (Canada)',
    'nonprofit_australia': 'ACNC Certificate (Australia)',
    // ✅ NEW: Countries WITHOUT Backend Database
    'nonprofit_kenya': 'Kenya NGO Certificate',
    'nonprofit_pakistan': 'Pakistan SECP Certificate',
    'nonprofit_nepal': 'Nepal SWC Certificate',
    'nonprofit_nigeria': 'Nigeria CAC Certificate',
    'nonprofit_philippines': 'Philippines SEC Certificate'
};

const TEACHER_PROFESSIONS = [
    'Primary Teacher', 'Math Teacher', 'Science Teacher', 'English Teacher',
    'History Teacher', 'Art Teacher', 'Music Teacher', 'Physical Education Teacher',
    'Computer Science Teacher', 'Special Education Teacher', 'Vice Principal', 'Assistant Principal'
];

// Sample names for fallback when Faker.js is not available
const SAMPLE_NAMES = [
    'John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
    'Lisa Miller', 'James Moore', 'Mary Taylor', 'Robert Anderson', 'Jennifer Thomas',
    'William Jackson', 'Patricia White', 'Richard Harris', 'Linda Martin', 'Thomas Thompson',
    'Barbara Garcia', 'Christopher Martinez', 'Susan Robinson', 'Daniel Clark', 'Helen Rodriguez'
];

let currentStep = 1;
let selectedDocumentTypes = [];
let schoolsData = [];
let uploadedPhotos = [];
let generatedDocuments = [];
let schoolMode = null; // 'single' or 'multi'
let performanceMode = true; // Enable performance optimizations
let isNonprofitMode = false; // ✅ Track if nonprofit certificates are selected

// Initialize Faker with locale
if (typeof faker !== 'undefined') {
    faker.setLocale('en');
}

// ✅ Check if nonprofit certificates are selected
function checkIfNonprofitMode() {
    const nonprofitTypes = [
        'nonprofit_12a', 'nonprofit_80g', 'nonprofit_darpan', 
        'nonprofit_fcra', 'nonprofit_trust', 'nonprofit_pan', 
        'nonprofit_501c3', 'nonprofit_uk', 'nonprofit_canada', 'nonprofit_australia',
        // ✅ NEW: Countries without backend database
        'nonprofit_kenya', 'nonprofit_pakistan', 'nonprofit_nepal', 
        'nonprofit_nigeria', 'nonprofit_philippines'
    ];
    isNonprofitMode = selectedDocumentTypes.some(type => nonprofitTypes.includes(type));
    return isNonprofitMode;
}

// Step Navigation
function nextStep(step) {
    if (validateCurrentStep()) {
        hideAllSteps();
        showStep(step);
        updateProgressSteps(step);
        currentStep = step;
        
        // ✅ Modify Step 2 based on document type
        if (step === 2) {
            checkIfNonprofitMode();
            if (isNonprofitMode) {
                updateStep2ForNonprofit();
            }
        }
        
        if (step === 3) {
            startDocumentGeneration();
        }
    }
}

// ✅ Update Step 2 for Nonprofit Certificates
function updateStep2ForNonprofit() {
    // Change header title
    const header = document.querySelector('#content-step2 .card-header h4');
    if (header) {
        header.innerHTML = '<i class="fas fa-building me-2"></i>Organization Details';
    }
    
    // Update info alert
    const configText = document.getElementById('configurationText');
    if (configText) {
        configText.textContent = 'Enter details for your nonprofit organization. All information will be used to generate professional certificates.';
    }
    
    // Hide school mode selection for nonprofits
    const modeSelection = document.getElementById('schoolModeSelectionButtons');
    if (modeSelection) {
        modeSelection.style.display = 'none';
    }
    
    // Show organization configuration immediately
    const schoolConfig = document.getElementById('schoolConfiguration');
    if (schoolConfig) {
        schoolConfig.classList.remove('d-none');
    }
    
    // Update form labels and fields
    const schoolForms = document.querySelectorAll('.school-form');
    if (schoolForms.length > 0 || !schoolForms.length) {
        // Clear existing forms and generate nonprofit form
        generateNonprofitForm();
    }
}

// ✅ Generate Nonprofit Organization Form
function generateNonprofitForm() {
    const container = document.getElementById('schoolFormsContainer');
    container.innerHTML = '';
    
    const formDiv = document.createElement('div');
    formDiv.className = 'school-form fade-in';
    
    formDiv.innerHTML = `
        <div class="school-form-header">
            <h5 class="mb-0">
                <i class="fas fa-building me-2"></i>Nonprofit Organization Details
            </h5>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Organization Name</label>
                <input type="text" class="form-control org-name" placeholder="e.g., Education for All Trust" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Country</label>
                <select class="form-select org-country" required>
                    <option value="">Select Country</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Kenya">🇰🇪 Kenya</option>
                    <option value="Pakistan">🇵🇰 Pakistan</option>
                    <option value="Nepal">🇳🇵 Nepal</option>
                    <option value="Nigeria">🇳🇬 Nigeria</option>
                    <option value="Philippines">🇵🇭 Philippines</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Address</label>
                <input type="text" class="form-control org-address" placeholder="e.g., 123 Main Street" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">City</label>
                <input type="text" class="form-control org-city" placeholder="e.g., Mumbai" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">State/Province</label>
                <input type="text" class="form-control org-state" placeholder="e.g., Maharashtra" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">PAN Number (for India)</label>
                <input type="text" class="form-control org-pan" placeholder="e.g., AAATX1234A">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Registration Number</label>
                <input type="text" class="form-control org-reg" placeholder="e.g., MH/2024/123456">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Organization Type</label>
                <input type="text" class="form-control org-type" placeholder="e.g., Public Charitable Trust" value="Public Charitable Trust">
            </div>
        </div>
    `;
    
    container.appendChild(formDiv);
    
    // Hide photo upload section for nonprofits
    const photoSection = document.querySelector('.card.mt-4');
    if (photoSection && photoSection.querySelector('h5')?.textContent.includes('Teacher Photo')) {
        photoSection.style.display = 'none';
    }
    
    // Hide number of schools row
    const numSchoolsRow = document.getElementById('numSchoolsRow');
    if (numSchoolsRow) {
        numSchoolsRow.style.display = 'none';
    }
}

function previousStep(step) {
    hideAllSteps();
    showStep(step);
    updateProgressSteps(step);
    currentStep = step;
}

function hideAllSteps() {
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('d-none');
    });
}

function showStep(step) {
    const content = document.getElementById(`content-step${step}`);
    if (content) {
        content.classList.remove('d-none');
        content.classList.add('fade-in');
    }
}

function updateProgressSteps(activeStep) {
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 <= activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // ✅ Update step 2 title based on mode
    const step2Title = document.querySelector('#step2 .step-title');
    if (step2Title && isNonprofitMode) {
        step2Title.textContent = 'Organization Details';
    } else if (step2Title) {
        step2Title.textContent = 'School Details';
    }
}
// Document Type Selection
document.addEventListener('DOMContentLoaded', function() {
    const documentCards = document.querySelectorAll('.document-type-card');
    documentCards.forEach(card => {
        card.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            this.classList.toggle('selected', checkbox.checked);
        });
    });
});

// School Forms Generation
function generateSchoolForms(forceCount = null) {
    const numSchools = forceCount || parseInt(document.getElementById('numSchools').value);
    const container = document.getElementById('schoolFormsContainer');
    
    container.innerHTML = '';
    
    for (let i = 0; i < numSchools; i++) {
        const schoolForm = createSchoolForm(i + 1);
        container.appendChild(schoolForm);
    }
}

function createSchoolForm(schoolNumber) {
    const formDiv = document.createElement('div');
    formDiv.className = 'school-form fade-in';
    
    formDiv.innerHTML = `
        <div class="school-form-header">
            <h5 class="mb-0">
                <i class="fas fa-school me-2"></i>School ${schoolNumber}
            </h5>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">School Name</label>
                <div class="input-group">
                    <input type="text" class="form-control school-name" placeholder="Enter custom school name" required>
                    <button class="btn btn-outline-primary" type="button" onclick="autoGenerateSchoolName(this)" title="Auto Generate School Name">
                        <i class="fas fa-magic"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Country</label>
                <select class="form-select school-country" onchange="autoFillLocation(this)" required>
                    <option value="">Select Country</option>
                    ${Object.keys(COUNTRY_DATA).map(country => 
                        `<option value="${country}">${COUNTRY_DATA[country].flag} ${country}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Location/City</label>
                <div class="input-group">
                    <input type="text" class="form-control school-location" placeholder="Enter city or location" required>
                    <button class="btn btn-outline-primary" type="button" onclick="autoGenerateLocation(this)" title="Auto Generate Location">
                        <i class="fas fa-map-marker-alt"></i>
                    </button>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Documents per School (1-5)</label>
                <select class="form-select documents-count" required>
                    ${[1,2,3,4,5].map(num => 
                        `<option value="${num}" ${num === 3 ? 'selected' : ''}>${num} Documents</option>`
                    ).join('')}
                </select>
            </div>
        </div>
    `;
    
    return formDiv;
}

// Validation
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            selectedDocumentTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            if (selectedDocumentTypes.length === 0) {
                showAlert('Please select at least one document type.', 'warning');
                return false;
            }
            return true;
        case 2:
            // ✅ Different validation for nonprofit vs teacher docs
            if (checkIfNonprofitMode()) {
                return validateNonprofitForm();
            } else {
                return validateSchoolForms();
            }
        default:
            return true;
    }
}

// ✅ Validate Nonprofit Organization Form
function validateNonprofitForm() {
    const form = document.querySelector('.school-form');
    if (!form) {
        showAlert('Please fill in the organization details.', 'warning');
        return false;
    }
    
    const orgName = form.querySelector('.org-name').value.trim();
    const country = form.querySelector('.org-country').value;
    const address = form.querySelector('.org-address').value.trim();
    const city = form.querySelector('.org-city').value.trim();
    const state = form.querySelector('.org-state').value.trim();
    
    if (!orgName || !country || !address || !city || !state) {
        showAlert('Please fill all required organization fields.', 'warning');
        return false;
    }
    
    // Store organization data
    schoolsData = [{
        name: orgName,
        country: country,
        address: address,
        city: city,
        state: state,
        pan: form.querySelector('.org-pan').value.trim(),
        registrationNo: form.querySelector('.org-reg').value.trim(),
        type: form.querySelector('.org-type').value.trim() || 'Public Charitable Trust',
        documentsCount: 1 // One org = one set of certificates
    }];
    
    return true;
}

function validateSchoolForms() {
    const schools = document.querySelectorAll('.school-form');
    schoolsData = [];
    let isValid = true;
    
    schools.forEach((form, index) => {
        const schoolName = form.querySelector('.school-name').value.trim();
        const country = form.querySelector('.school-country').value;
        const location = form.querySelector('.school-location').value.trim();
        const documentsCount = parseInt(form.querySelector('.documents-count').value);
        
        if (!schoolName || !country || !location || !documentsCount) {
            showAlert(`Please fill all fields for School ${index + 1}.`, 'warning');
            isValid = false;
            return;
        }
        
        schoolsData.push({
            name: schoolName,
            country: country,
            location: location,
            documentsCount: documentsCount
        });
    });
    
    return isValid;
}

// Document Generation
function startDocumentGeneration() {
    const statusDiv = document.getElementById('generationStatus');
    const documentsDiv = document.getElementById('generatedDocuments');
    
    statusDiv.classList.remove('d-none');
    documentsDiv.classList.add('d-none');
    
    // Show instant generation message
    const messageText = isNonprofitMode ? 'Generating nonprofit certificates...' : 'Generating professional documents instantly...';
    statusDiv.querySelector('p').textContent = messageText;
    
    // Generate documents immediately with visual feedback
    setTimeout(() => {
        generateAllDocuments();
    }, 100); // Minimal delay for smooth UX
}

function generateAllDocuments() {
    generatedDocuments = [];
    let documentIndex = 0;
    
    // Performance optimization for single school mode
    const batchSize = schoolMode === 'single' ? 1 : 3;
    
    // Initialize the preview grid immediately
    const statusDiv = document.getElementById('generationStatus');
    const documentsDiv = document.getElementById('generatedDocuments');
    const gridDiv = document.getElementById('documentGrid');
    
    statusDiv.classList.add('d-none');
    documentsDiv.classList.remove('d-none');
    gridDiv.innerHTML = '';
    
    // Calculate total documents for progress tracking
    let totalDocuments = 0;
    if (isNonprofitMode) {
        totalDocuments = selectedDocumentTypes.length;
    } else {
        schoolsData.forEach((school) => {
            totalDocuments += school.documentsCount * selectedDocumentTypes.length;
        });
    }
    
    let docIndex = 0;
    
    // Show instant feedback message
    if (performanceMode) {
        const docTypeText = isNonprofitMode ? 'nonprofit certificates' : 'documents';
        showAlert(`🚀 Generating ${totalDocuments} ${docTypeText} with AI-powered content...`, 'info');
    }
    
    // ✅ Generate nonprofit certificates or teacher documents
    if (isNonprofitMode) {
        generateNonprofitCertificates(gridDiv, totalDocuments);
    } else {
        generateTeacherDocuments(gridDiv, totalDocuments, batchSize);
    }
}

// ✅ Generate Nonprofit Certificates
function generateNonprofitCertificates(gridDiv, totalDocuments) {
    const orgData = schoolsData[0]; // Get organization data
    
    selectedDocumentTypes.forEach((docType, index) => {
        // Add placeholder immediately
        const placeholder = createDocumentPlaceholder(docType, orgData.name, orgData.city);
        gridDiv.appendChild(placeholder);
        
        setTimeout(() => {
            let documentDataURL;
            
            try {
                // Call appropriate nonprofit certificate generator
                switch (docType) {
                    // India
                    case 'nonprofit_12a':
                        documentDataURL = nonprofitGenerator.generate12ACertificate(orgData);
                        break;
                    case 'nonprofit_80g':
                        documentDataURL = nonprofitGenerator.generate80GCertificate(orgData);
                        break;
                    case 'nonprofit_darpan':
                        documentDataURL = nonprofitGenerator.generateNGODarpanID(orgData);
                        break;
                    case 'nonprofit_fcra':
                        documentDataURL = nonprofitGenerator.generateFCRACertificate(orgData);
                        break;
                    case 'nonprofit_trust':
                        documentDataURL = nonprofitGenerator.generateTrustDeed(orgData);
                        break;
                    case 'nonprofit_pan':
                        documentDataURL = nonprofitGenerator.generatePANCard(orgData);
                        break;
                    // Western Countries
                    case 'nonprofit_501c3':
                        documentDataURL = nonprofitGenerator.generate501c3Certificate(orgData);
                        break;
                    case 'nonprofit_uk':
                        documentDataURL = nonprofitGenerator.generateUKCharityRegistration(orgData);
                        break;
                    case 'nonprofit_canada':
                        documentDataURL = nonprofitGenerator.generateCanadaCRACertificate(orgData);
                        break;
                    case 'nonprofit_australia':
                        documentDataURL = nonprofitGenerator.generateAustraliaACNCCertificate(orgData);
                        break;
                    // ✅ NEW: Countries WITHOUT Backend Database
                    case 'nonprofit_kenya':
                        documentDataURL = nonprofitGenerator.generateKenyaNGOCertificate(orgData);
                        break;
                    case 'nonprofit_pakistan':
                        documentDataURL = nonprofitGenerator.generatePakistanSECPCertificate(orgData);
                        break;
                    case 'nonprofit_nepal':
                        documentDataURL = nonprofitGenerator.generateNepalSWCCertificate(orgData);
                        break;
                    case 'nonprofit_nigeria':
                        documentDataURL = nonprofitGenerator.generateNigeriaCACCertificate(orgData);
                        break;
                    case 'nonprofit_philippines':
                        documentDataURL = nonprofitGenerator.generatePhilippinesSECCertificate(orgData);
                        break;
                }
                
                const docData = {
                    type: docType,
                    schoolName: orgData.name,
                    teacherName: orgData.name,
                    country: orgData.country,
                    dataURL: documentDataURL,
                    filename: `${DOCUMENT_TYPES[docType]}_${orgData.name.replace(/\s+/g, '_')}.jpg`
                };
                
                generatedDocuments.push(docData);
                
                // Update placeholder with actual document
                updateDocumentPlaceholder(placeholder, docData, generatedDocuments.length - 1);
                
                // Show completion message when all done
                if (generatedDocuments.length === totalDocuments) {
                    showAlert(`🎉 Generated ${totalDocuments} nonprofit certificates successfully!`, 'success');
                }
            } catch (error) {
                console.error(`Error generating ${DOCUMENT_TYPES[docType]}:`, error);
                const errorMsg = `Error: Failed to generate certificate`;
                placeholder.querySelector('.document-preview-placeholder p').textContent = errorMsg;
                placeholder.querySelector('.document-preview-placeholder').style.borderColor = '#dc3545';
            }
        }, index * 100);
    });
}
// Generate Teacher Documents (existing function)
function generateTeacherDocuments(gridDiv, totalDocuments, batchSize) {
    let docIndex = 0;
    let documentIndex = 0;
    
    schoolsData.forEach((school, schoolIndex) => {
        for (let schoolDocIndex = 0; schoolDocIndex < school.documentsCount; schoolDocIndex++) {
            // Generate random teacher data
            const teacherData = generateTeacherData();
            
            selectedDocumentTypes.forEach((docType) => {
                // Add placeholder immediately for instant feedback
                const placeholder = createDocumentPlaceholder(docType, teacherData.name, school.name);
                gridDiv.appendChild(placeholder);
                
                // Generate document immediately in the next animation frame
                const delay = performanceMode ? Math.floor(docIndex / batchSize) * 50 : docIndex * 100;
                
                setTimeout(() => {
                    const photo = uploadedPhotos[documentIndex % uploadedPhotos.length] || null;
                    let documentDataURL;
                    
                    try {
                        switch (docType) {
                            case 'id_card':
                                documentDataURL = documentGenerator.generateIDCard(teacherData, school, photo);
                                break;
                            case 'receipt':
                                documentDataURL = documentGenerator.generateSalaryReceipt(teacherData, school);
                                break;
                            case 'certificate':
                                documentDataURL = documentGenerator.generateCertificate(teacherData, school);
                                break;
                            case 'transcript':
                                documentDataURL = documentGenerator.generateTranscript(teacherData, school);
                                break;
                            case 'degree':
                                documentDataURL = documentGenerator.generateDegree(teacherData, school);
                                break;
                            case 'course_completion':
                                documentDataURL = documentGenerator.generateCourseCompletion(teacherData, school);
                                break;
                            case 'training':
                                documentDataURL = documentGenerator.generateTraining(teacherData, school);
                                break;
                            case 'conference':
                                documentDataURL = documentGenerator.generateConference(teacherData, school);
                                break;  
                        }
                        
                        const docData = {
                            type: docType,
                            schoolName: school.name,
                            teacherName: teacherData.name,
                            country: school.country,
                            dataURL: documentDataURL,
                            filename: `${DOCUMENT_TYPES[docType]}_${teacherData.name.replace(/\s+/g, '_')}_${teacherData.id}.jpg`,
                            qrData: safeAICall('generateQRCodeData', { 
                                documentType: docType,
                                teacherName: teacherData.name,
                                teacherId: teacherData.id,
                                schoolName: school.name,
                                country: school.country,
                                issueDate: new Date().toISOString(),
                                verificationId: `${docType.toUpperCase()}-${Date.now()}`,
                                verificationUrl: `https://verify.teacherdocs.com/${docType}-${Date.now()}`
                            }, docType, teacherData, school)
                        };
                        
                        generatedDocuments.push(docData);
                        
                        // Update placeholder with actual document
                        updateDocumentPlaceholder(placeholder, docData, generatedDocuments.length - 1);
                        
                        // Show completion message when all done
                        if (generatedDocuments.length === totalDocuments) {
                            const timeMessage = performanceMode ? 'in record time' : 'successfully';
                            showAlert(`🎉 Generated ${totalDocuments} professional documents ${timeMessage}!`, 'success');
                        }
                    } catch (error) {
                        console.error(`Error generating ${DOCUMENT_TYPES[docType]} document:`, error);
                        // Keep placeholder as is, but add error indicator with more specific message
                        const errorMsg = error.message ? `Error: ${error.message}` : `Failed to generate ${DOCUMENT_TYPES[docType]}`;
                        placeholder.querySelector('.document-preview-placeholder p').textContent = errorMsg;
                        placeholder.querySelector('.document-preview-placeholder').style.borderColor = '#dc3545';
                    }
                }, delay);
                
                docIndex++;
            });
            
            documentIndex++;
        }
    });
}

// Helper functions for live preview
function createDocumentPlaceholder(docType, name, location) {
    const docDiv = document.createElement('div');
    docDiv.className = 'col-md-4 mb-4';
    
    docDiv.innerHTML = `
        <div class="document-item">
            <div class="document-preview-placeholder">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Generating...</span>
                </div>
                <p class="mt-2">Creating document...</p>
            </div>
            <div class="document-info">
                <h6>${DOCUMENT_TYPES[docType]}</h6>
                <small class="text-muted">${name}</small><br>
                <small class="text-muted">${location}</small>
                <div class="btn-group mt-2 w-100">
                    <button class="btn btn-sm btn-outline-secondary" disabled>
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <button class="btn btn-sm btn-outline-primary" disabled>
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return docDiv;
}

function updateDocumentPlaceholder(placeholder, docData, index) {
    const placeholderDiv = placeholder.querySelector('.document-preview-placeholder');
    const buttons = placeholder.querySelectorAll('button');
    
    // Replace placeholder with actual document image
    placeholderDiv.outerHTML = `
        <img src="${docData.dataURL}" class="document-preview" onclick="previewDocument(${index})" alt="${docData.filename}">
        <div class="document-overlay">
            <div class="text-center">
                <i class="fas fa-eye fa-2x mb-2"></i>
                <p>Click to Preview</p>
            </div>
        </div>
    `;
    
    // Add receipt information display for salary receipts (teacher docs only)
    if (docData.type === 'receipt' && !isNonprofitMode) {
        const receiptInfoElement = document.createElement('div');
        receiptInfoElement.className = 'receipt-info-mini mt-2 p-2 bg-light border rounded';
        receiptInfoElement.innerHTML = `
            <div class="receipt-mini-row mb-2">
                <label class="small text-muted fw-bold">School:</label>
                <div class="d-flex align-items-center">
                    <span class="copyable-text-mini nano-font flex-grow-1 me-2" data-copy-text="${docData.schoolName}">
                        ${docData.schoolName.length > 25 ? docData.schoolName.substring(0, 25) + '...' : docData.schoolName}
                    </span>
                    <button class="btn btn-sm btn-outline-primary copy-btn-mini" onclick="copyToClipboard('${docData.schoolName}', this)" title="Copy school name">
                        <i class="fas fa-copy" style="font-size: 0.7rem;"></i>
                    </button>
                </div>
            </div>
            <div class="receipt-mini-row">
                <label class="small text-muted fw-bold">Teacher:</label>
                <div class="d-flex align-items-center">
                    <span class="copyable-text-mini nano-font flex-grow-1 me-2" data-copy-text="${docData.teacherName}">
                        ${docData.teacherName}
                    </span>
                    <button class="btn btn-sm btn-outline-primary copy-btn-mini" onclick="copyToClipboard('${docData.teacherName}', this)" title="Copy teacher name">
                        <i class="fas fa-copy" style="font-size: 0.7rem;"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Insert receipt info before the buttons
        const documentInfo = placeholder.querySelector('.document-info');
        const buttonGroup = documentInfo.querySelector('.btn-group');
        documentInfo.insertBefore(receiptInfoElement, buttonGroup);
    }
    
    // Enable buttons with proper click handlers
    buttons[0].disabled = false;
    buttons[0].onclick = () => previewDocument(index);
    buttons[1].disabled = false;
    buttons[1].onclick = () => downloadDocument(index);
    
    // Add success animation
    placeholder.classList.add('fade-in');
}

function generateTeacherData() {
    const profession = TEACHER_PROFESSIONS[Math.floor(Math.random() * TEACHER_PROFESSIONS.length)];
    const teacherId = generateTeacherId();
    
    // Use AI-powered name generation based on selected countries with fallbacks
    let aiGeneratedName;
    if (schoolsData.length > 0) {
        const randomSchool = schoolsData[Math.floor(Math.random() * schoolsData.length)];
        aiGeneratedName = safeAICall('generateCulturalName', null, randomSchool.country);
    } else {
        aiGeneratedName = safeAICall('generateGenericName', null);
    }
    
    const sampleName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    const finalName = faker ? faker.person.fullName() : (aiGeneratedName || sampleName);
    
    // Generate professional email using AI with fallback
    const schoolName = schoolsData.length > 0 ? schoolsData[0].name : 'Global Academy';
    const country = schoolsData.length > 0 ? schoolsData[0].country : 'USA';
    const professionalEmail = safeAICall('generateProfessionalEmail', `${finalName.toLowerCase().replace(' ', '.')}@education.com`, finalName, schoolName, country);
    
    return {
        name: finalName,
        id: teacherId,
        profession: profession,
        email: faker ? faker.internet.email() : professionalEmail,
        phone: faker ? faker.phone.number() : `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        degree: safeAICall('generateRandomDegree', 'Bachelor of Education', profession),
        signature: safeAICall('generateDigitalSignature', { text: finalName, font: 'Arial', size: 16, slant: 0, weight: 'normal' }, finalName)
    };
}

function generateTeacherId() {
    const year = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `TCH${year}${sequence}`;
}

// Auto-Generation Functions
function autoGenerateSchoolName(button) {
    const schoolForm = button.closest('.school-form');
    const countrySelect = schoolForm.querySelector('.school-country');
    const nameInput = schoolForm.querySelector('.school-name');
    
    const selectedCountry = countrySelect.value;
    if (!selectedCountry || !COUNTRY_DATA[selectedCountry].schoolNames) {
        // Use Faker.js or fallback names
        if (typeof faker !== 'undefined') {
            nameInput.value = faker.company.name() + ' School';
        } else {
            const fallbackNames = ['Springfield Elementary', 'Riverside High School', 'Oakwood Academy', 'Sunset Middle School', 'Pine Valley School'];
            nameInput.value = fallbackNames[Math.floor(Math.random() * fallbackNames.length)];
        }
    } else {
        // Use country-specific school names
        const schoolNames = COUNTRY_DATA[selectedCountry].schoolNames;
        nameInput.value = schoolNames[Math.floor(Math.random() * schoolNames.length)];
    }
    
    // Add visual feedback
    nameInput.classList.add('is-valid');
    setTimeout(() => {
        nameInput.classList.remove('is-valid');
    }, 1000);
}

function autoGenerateLocation(button) {
    const schoolForm = button.closest('.school-form');
    const countrySelect = schoolForm.querySelector('.school-country');
    const locationInput = schoolForm.querySelector('.school-location');
    
    const selectedCountry = countrySelect.value;
    if (!selectedCountry || !COUNTRY_DATA[selectedCountry].cities) {
        // Use Faker.js or fallback locations
        if (typeof faker !== 'undefined') {
            locationInput.value = faker.location.city();
        } else {
            const fallbackCities = ['Springfield', 'Riverside', 'Oakwood', 'Sunset Valley', 'Pine Ridge'];
            locationInput.value = fallbackCities[Math.floor(Math.random() * fallbackCities.length)];
        }
    } else {
        // Use country-specific cities
        const cities = COUNTRY_DATA[selectedCountry].cities;
        locationInput.value = cities[Math.floor(Math.random() * cities.length)];
    }
    
    // Add visual feedback
    locationInput.classList.add('is-valid');
    setTimeout(() => {
        locationInput.classList.remove('is-valid');
    }, 1000);
}

function autoFillLocation(countrySelect) {
    // Auto-fill location when country changes and location is empty
    const schoolForm = countrySelect.closest('.school-form');
    const locationInput = schoolForm.querySelector('.school-location');
    
    if (!locationInput.value.trim() && countrySelect.value && COUNTRY_DATA[countrySelect.value].cities) {
        const cities = COUNTRY_DATA[countrySelect.value].cities;
        locationInput.value = cities[Math.floor(Math.random() * cities.length)];
    }
}

function autoGenerateAllSchools() {
    const schoolForms = document.querySelectorAll('.school-form');
    const countries = Object.keys(COUNTRY_DATA);
    
    schoolForms.forEach((form, index) => {
        // Select a random country
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const countrySelect = form.querySelector('.school-country');
        const nameInput = form.querySelector('.school-name');
        const locationInput = form.querySelector('.school-location');
        
        // Set country
        countrySelect.value = randomCountry;
        
        // Generate school name based on country
        if (COUNTRY_DATA[randomCountry].schoolNames) {
            const schoolNames = COUNTRY_DATA[randomCountry].schoolNames;
            nameInput.value = schoolNames[Math.floor(Math.random() * schoolNames.length)];
        } else if (typeof faker !== 'undefined') {
            nameInput.value = faker.company.name() + ' School';
        } else {
            nameInput.value = `School ${index + 1} Academy`;
        }
        
        // Generate location based on country
        if (COUNTRY_DATA[randomCountry].cities) {
            const cities = COUNTRY_DATA[randomCountry].cities;
            locationInput.value = cities[Math.floor(Math.random() * cities.length)];
        } else if (typeof faker !== 'undefined') {
            locationInput.value = faker.location.city();
        } else {
            locationInput.value = `City ${index + 1}`;
        }
        
        // Add visual feedback
        [nameInput, locationInput, countrySelect].forEach(element => {
            element.classList.add('is-valid');
        });
    });
    
    // Remove visual feedback after animation
    setTimeout(() => {
        schoolForms.forEach(form => {
            form.querySelectorAll('.is-valid').forEach(element => {
                element.classList.remove('is-valid');
            });
        });
    }, 1500);
    
    showAlert('All schools auto-generated successfully! 🎉', 'success');
}

// Photo Upload Handling
function previewPhotos() {
    const fileInput = document.getElementById('teacherPhotos');
    const previewContainer = document.getElementById('photoPreview');
    
    previewContainer.innerHTML = '';
    uploadedPhotos = [];
    
    Array.from(fileInput.files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    uploadedPhotos.push(img);
                    
                    const previewItem = document.createElement('div');
                    previewItem.className = 'photo-preview-item';
                    
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Teacher Photo ${index + 1}">
                        <button type="button" class="remove-photo" onclick="removePhoto(${index})">×</button>
                    `;
                    
                    previewContainer.appendChild(previewItem);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function removePhoto(index) {
    uploadedPhotos.splice(index, 1);
    previewPhotos(); // Refresh preview
}
// Download Functions
function downloadDocument(index) {
    const doc = generatedDocuments[index];
    const link = document.createElement('a');
    link.href = doc.dataURL;
    link.download = doc.filename;
    link.click();
}

function downloadAll() {
    generatedDocuments.forEach((doc, index) => {
        setTimeout(() => {
            downloadDocument(index);
        }, index * 100); // Stagger downloads
    });
    
    showAlert('All documents are being downloaded!', 'success');
}

function previewDocument(index) {
    const doc = generatedDocuments[index];
    const modal = createPreviewModal(doc);
    document.body.appendChild(modal);
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

function createPreviewModal(doc) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    
    // Generate receipt information section for salary receipts (teacher docs only)
    const receiptInfoSection = (doc.type === 'receipt' && !isNonprofitMode) ? `
        <div class="receipt-info-section mt-3 mb-4 p-3 bg-light rounded">
            <h6 class="text-primary mb-3">
                <i class="fas fa-info-circle me-2"></i>Receipt Information
            </h6>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label text-muted small fw-bold">School Name</label>
                    <div class="copyable-field d-flex align-items-center">
                        <span class="copyable-text flex-grow-1 p-2 bg-white rounded border nano-font" data-copy-text="${doc.schoolName}">
                            ${doc.schoolName}
                        </span>
                        <button class="btn btn-outline-primary btn-sm ms-2 copy-btn" onclick="copyToClipboard('${doc.schoolName}', this)" title="Copy school name">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label text-muted small fw-bold">Teacher Name</label>
                    <div class="copyable-field d-flex align-items-center">
                        <span class="copyable-text flex-grow-1 p-2 bg-white rounded border nano-font" data-copy-text="${doc.teacherName}">
                            ${doc.teacherName}
                        </span>
                        <button class="btn btn-outline-primary btn-sm ms-2 copy-btn" onclick="copyToClipboard('${doc.teacherName}', this)" title="Copy teacher name">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="text-center mt-2">
                <small class="text-muted">
                    <i class="fas fa-mouse-pointer me-1"></i>Tap copy buttons to copy information to clipboard
                </small>
            </div>
        </div>
    ` : '';
    
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${DOCUMENT_TYPES[doc.type]} - ${doc.teacherName}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${doc.dataURL}" class="img-fluid" alt="${doc.filename}">
                    ${receiptInfoSection}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="downloadDocument(${generatedDocuments.indexOf(doc)})">
                        <i class="fas fa-download me-2"></i>Download JPG
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

// New Generation
function generateNew() {
    currentStep = 1;
    selectedDocumentTypes = [];
    schoolsData = [];
    uploadedPhotos = [];
    generatedDocuments = [];
    isNonprofitMode = false; // ✅ Reset nonprofit mode
    
    // Reset form
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.document-type-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('schoolFormsContainer').innerHTML = '';
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('teacherPhotos').value = '';
    
    // Go to step 1
    hideAllSteps();
    showStep(1);
    updateProgressSteps(1);
}

// Utility Functions
function copyToClipboard(text, buttonElement) {
    // Modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(buttonElement, text);
        }).catch(err => {
            // Fallback for older browsers
            fallbackCopyToClipboard(text, buttonElement);
        });
    } else {
        // Fallback for older browsers or insecure contexts
        fallbackCopyToClipboard(text, buttonElement);
    }
}

function fallbackCopyToClipboard(text, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(buttonElement, text);
        } else {
            showCopyError(buttonElement);
        }
    } catch (err) {
        showCopyError(buttonElement);
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(buttonElement, text) {
    const originalIcon = buttonElement.innerHTML;
    const originalTitle = buttonElement.title;
    
    // Show success feedback
    buttonElement.innerHTML = '<i class="fas fa-check"></i>';
    buttonElement.classList.remove('btn-outline-primary');
    buttonElement.classList.add('btn-success');
    buttonElement.title = 'Copied!';
    
    // Show toast-like notification
    showAlert(`Copied: "${text.length > 50 ? text.substring(0, 50) + '...' : text}"`, 'success');
    
    // Reset button after 2 seconds
    setTimeout(() => {
        buttonElement.innerHTML = originalIcon;
        buttonElement.classList.remove('btn-success');
        buttonElement.classList.add('btn-outline-primary');
        buttonElement.title = originalTitle;
    }, 2000);
}

function showCopyError(buttonElement) {
    const originalIcon = buttonElement.innerHTML;
    const originalTitle = buttonElement.title;
    
    // Show error feedback
    buttonElement.innerHTML = '<i class="fas fa-times"></i>';
    buttonElement.classList.remove('btn-outline-primary');
    buttonElement.classList.add('btn-danger');
    buttonElement.title = 'Copy failed';
    
    showAlert('Failed to copy to clipboard. Please try again.', 'warning');
    
    // Reset button after 2 seconds
    setTimeout(() => {
        buttonElement.innerHTML = originalIcon;
        buttonElement.classList.remove('btn-danger');
        buttonElement.classList.add('btn-outline-primary');
        buttonElement.title = originalTitle;
    }, 2000);
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Generate initial school forms
    generateSchoolForms();
    
    // Set initial step
    updateProgressSteps(1);
});

// School Mode Selection
function setSchoolMode(mode) {
    schoolMode = mode;
    
    const schoolModeSelection = document.getElementById('schoolModeSelection');
    const schoolConfiguration = document.getElementById('schoolConfiguration');
    const selectedModeText = document.getElementById('selectedModeText');
    const configurationText = document.getElementById('configurationText');
    const numSchoolsRow = document.getElementById('numSchoolsRow');
    const numSchoolsLabel = document.getElementById('numSchoolsLabel');
    const autoGenerateText = document.getElementById('autoGenerateText');
    const numSchoolsSelect = document.getElementById('numSchools');
    
    // Show selected mode
    schoolModeSelection.classList.remove('d-none');
    schoolConfiguration.classList.remove('d-none');
    
    if (mode === 'single') {
        selectedModeText.textContent = 'Single School Mode - Optimized for fast generation with one school';
        configurationText.textContent = 'Enter details for one school. Perfect for focused document generation.';
        numSchoolsLabel.textContent = 'Documents per School (1-10)';
        autoGenerateText.textContent = 'Auto Generate School';
        
        // Update dropdown for single school mode
        numSchoolsSelect.innerHTML = `
            <option value="1">1 Document</option>
            <option value="2">2 Documents</option>
            <option value="3" selected>3 Documents</option>
            <option value="5">5 Documents</option>
            <option value="10">10 Documents</option>
        `;
        
        // Generate single school form
        generateSchoolForms(1);
    } else {
        selectedModeText.textContent = 'Multi-School Mode - Generate documents for multiple schools';
        configurationText.textContent = 'Enter details for 3-5 custom schools. All teacher names and data will be generated automatically using realistic information.';
        numSchoolsLabel.textContent = 'Number of Schools (3-5)';
        autoGenerateText.textContent = 'Auto Generate All Schools';
        
        // Reset dropdown for multi-school mode
        numSchoolsSelect.innerHTML = `
            <option value="3" selected>3 Schools</option>
            <option value="4">4 Schools</option>
            <option value="5">5 Schools</option>
        `;
        
        // Generate multiple school forms
        generateSchoolForms();
    }
    
    // Hide mode selection buttons after selection
    document.querySelectorAll('.card .btn').forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes('setSchoolMode')) {
            btn.disabled = true;
            if (btn.onclick.toString().includes(mode)) {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Selected';
                btn.classList.add('btn-light');
                btn.classList.remove('btn-primary', 'btn-success');
            }
        }
    });
}
