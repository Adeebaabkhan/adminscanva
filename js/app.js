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
    'conference': 'Conference Attendance Certificate'
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

// Initialize Faker with locale
if (typeof faker !== 'undefined') {
    faker.setLocale('en');
}

// Step Navigation
function nextStep(step) {
    if (validateCurrentStep()) {
        hideAllSteps();
        showStep(step);
        updateProgressSteps(step);
        currentStep = step;
        
        if (step === 3) {
            startDocumentGeneration();
        }
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
function generateSchoolForms() {
    const numSchools = parseInt(document.getElementById('numSchools').value);
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
            return validateSchoolForms();
        default:
            return true;
    }
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
    statusDiv.querySelector('p').textContent = 'Generating professional documents instantly...';
    
    // Generate documents immediately with visual feedback
    setTimeout(() => {
        generateAllDocuments();
    }, 100); // Minimal delay for smooth UX
}

function generateAllDocuments() {
    generatedDocuments = [];
    let documentIndex = 0;
    
    // Initialize the preview grid immediately
    const statusDiv = document.getElementById('generationStatus');
    const documentsDiv = document.getElementById('generatedDocuments');
    const gridDiv = document.getElementById('documentGrid');
    
    statusDiv.classList.add('d-none');
    documentsDiv.classList.remove('d-none');
    gridDiv.innerHTML = '';
    
    // Calculate total documents for progress tracking
    let totalDocuments = 0;
    schoolsData.forEach((school) => {
        totalDocuments += school.documentsCount * selectedDocumentTypes.length;
    });
    
    let docIndex = 0;
    
    schoolsData.forEach((school, schoolIndex) => {
        for (let schoolDocIndex = 0; schoolDocIndex < school.documentsCount; schoolDocIndex++) {
            // Generate random teacher data
            const teacherData = generateTeacherData();
            
            selectedDocumentTypes.forEach((docType) => {
                // Add placeholder immediately for instant feedback
                const placeholder = createDocumentPlaceholder(docType, teacherData.name, school.name);
                gridDiv.appendChild(placeholder);
                
                // Generate document immediately in the next animation frame
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
                            filename: `${DOCUMENT_TYPES[docType]}_${teacherData.name.replace(/\s+/g, '_')}_${teacherData.id}.jpg`
                        };
                        
                        generatedDocuments.push(docData);
                        
                        // Update placeholder with actual document
                        updateDocumentPlaceholder(placeholder, docData, generatedDocuments.length - 1);
                        
                        // Show completion message when all done
                        if (generatedDocuments.length === totalDocuments) {
                            showAlert(`🎉 Generated ${totalDocuments} documents instantly!`, 'success');
                        }
                    } catch (error) {
                        console.error('Error generating document:', error);
                        // Keep placeholder as is, but add error indicator
                        placeholder.querySelector('.document-preview-placeholder p').textContent = 'Generation failed';
                    }
                }, docIndex * 100); // Stagger by 100ms for smooth animation
                
                docIndex++;
            });
            
            documentIndex++;
        }
    });
}

// Helper functions for live preview
function createDocumentPlaceholder(docType, teacherName, schoolName) {
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
                <small class="text-muted">${teacherName}</small><br>
                <small class="text-muted">${schoolName}</small>
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
    
    // Use AI-powered name generation based on selected countries
    let aiGeneratedName;
    if (schoolsData.length > 0) {
        const randomSchool = schoolsData[Math.floor(Math.random() * schoolsData.length)];
        aiGeneratedName = aiFeatures.generateCulturalName(randomSchool.country);
    } else {
        aiGeneratedName = aiFeatures.generateGenericName();
    }
    
    const sampleName = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    const finalName = faker ? faker.person.fullName() : (aiGeneratedName || sampleName);
    
    // Generate professional email using AI
    const schoolName = schoolsData.length > 0 ? schoolsData[0].name : 'Global Academy';
    const country = schoolsData.length > 0 ? schoolsData[0].country : 'USA';
    const professionalEmail = aiFeatures.generateProfessionalEmail(finalName, schoolName, country);
    
    return {
        name: finalName,
        id: teacherId,
        profession: profession,
        email: faker ? faker.internet.email() : professionalEmail,
        phone: faker ? faker.phone.number() : `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        degree: aiFeatures.generateRandomDegree(profession),
        signature: aiFeatures.generateDigitalSignature(finalName)
    };
}

function generateTeacherId() {
    const year = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `TCH${year}${sequence}`;
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
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${DOCUMENT_TYPES[doc.type]} - ${doc.teacherName}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="${doc.dataURL}" class="img-fluid" alt="${doc.filename}">
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
