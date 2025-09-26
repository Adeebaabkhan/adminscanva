// Main Application Logic

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
                <input type="text" class="form-control school-name" placeholder="Enter custom school name" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Country</label>
                <select class="form-select school-country" required>
                    <option value="">Select Country</option>
                    ${Object.keys(COUNTRY_DATA).map(country => 
                        `<option value="${country}">${COUNTRY_DATA[country].flag} ${country}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Location/City</label>
                <input type="text" class="form-control school-location" placeholder="Enter city or location" required>
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Documents per School (1-10)</label>
                <select class="form-select documents-count" required>
                    ${[1,2,3,4,5,6,7,8,9,10].map(num => 
                        `<option value="${num}" ${num === 5 ? 'selected' : ''}>${num} Documents</option>`
                    ).join('')}
                </select>
            </div>
        </div>
    `;
    
    return formDiv;
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
    
    // Simulate generation process
    setTimeout(() => {
        generateAllDocuments();
    }, 2000);
}

function generateAllDocuments() {
    generatedDocuments = [];
    let documentIndex = 0;
    
    schoolsData.forEach((school, schoolIndex) => {
        for (let docIndex = 0; docIndex < school.documentsCount; docIndex++) {
            // Generate random teacher data
            const teacherData = generateTeacherData();
            
            selectedDocumentTypes.forEach(docType => {
                const photo = uploadedPhotos[documentIndex % uploadedPhotos.length] || null;
                let documentDataURL;
                
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
                }
                
                generatedDocuments.push({
                    type: docType,
                    schoolName: school.name,
                    teacherName: teacherData.name,
                    country: school.country,
                    dataURL: documentDataURL,
                    filename: `${DOCUMENT_TYPES[docType]}_${teacherData.name.replace(/\s+/g, '_')}_${teacherData.id}.jpg`
                });
            });
            
            documentIndex++;
        }
    });
    
    displayGeneratedDocuments();
}

function generateTeacherData() {
    const profession = TEACHER_PROFESSIONS[Math.floor(Math.random() * TEACHER_PROFESSIONS.length)];
    const teacherId = generateTeacherId();
    
    return {
        name: faker ? faker.person.fullName() : `Teacher ${Math.floor(Math.random() * 1000)}`,
        id: teacherId,
        profession: profession,
        email: faker ? faker.internet.email() : `teacher${teacherId}@school.edu`,
        phone: faker ? faker.phone.number() : `+1-555-${Math.floor(Math.random() * 9000) + 1000}`
    };
}

function generateTeacherId() {
    const year = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 9000) + 1000;
    return `TCH${year}${sequence}`;
}

function displayGeneratedDocuments() {
    const statusDiv = document.getElementById('generationStatus');
    const documentsDiv = document.getElementById('generatedDocuments');
    const gridDiv = document.getElementById('documentGrid');
    
    statusDiv.classList.add('d-none');
    documentsDiv.classList.remove('d-none');
    
    gridDiv.innerHTML = '';
    
    generatedDocuments.forEach((doc, index) => {
        const docDiv = document.createElement('div');
        docDiv.className = 'col-md-4 mb-4';
        
        docDiv.innerHTML = `
            <div class="document-item">
                <img src="${doc.dataURL}" class="document-preview" onclick="previewDocument(${index})" alt="${doc.filename}">
                <div class="document-overlay">
                    <div class="text-center">
                        <i class="fas fa-eye fa-2x mb-2"></i>
                        <p>Click to Preview</p>
                    </div>
                </div>
                <div class="document-info">
                    <h6>${DOCUMENT_TYPES[doc.type]}</h6>
                    <small class="text-muted">${doc.teacherName}</small><br>
                    <small class="text-muted">${COUNTRY_DATA[doc.country].flag} ${doc.schoolName}</small>
                    <div class="mt-2">
                        <button class="btn btn-primary btn-sm" onclick="downloadDocument(${index})">
                            <i class="fas fa-download me-1"></i>Download JPG
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        gridDiv.appendChild(docDiv);
    });
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
