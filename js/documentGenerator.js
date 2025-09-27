// Document Generator Functions

class DocumentGenerator {
    constructor() {
        this.canvas = document.getElementById('documentCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.uploadedPhotos = [];
    }

    // Generate Teacher ID Card
    generateIDCard(teacherData, schoolData, uploadedPhoto = null) {
        // Set canvas size for ID card
        this.canvas.width = 600;
        this.canvas.height = 380;
        
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 80);
        gradient.addColorStop(0, '#1976d2');
        gradient.addColorStop(1, '#1e88e5');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, 80);
        
        // School logo area
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(15, 10, 55, 55);
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.strokeRect(15, 10, 55, 55);
        
        // School abbreviation in logo
        const schoolAbbr = schoolData.name.split(' ').map(word => word[0]).join('').substring(0, 3).toUpperCase();
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(schoolAbbr, 42, 42);
        
        // School name in header
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'left';
        const schoolName = schoolData.name.toUpperCase();
        if (schoolName.length > 35) {
            const words = schoolName.split(' ');
            const mid = Math.floor(words.length / 2);
            ctx.fillText(words.slice(0, mid).join(' '), 85, 28);
            ctx.font = '14px Arial';
            ctx.fillText(words.slice(mid).join(' '), 85, 50);
        } else {
            ctx.fillText(schoolName, 85, 40);
        }
        
        // ID Card title
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('TEACHER', this.canvas.width - 20, 25);
        ctx.fillText('ID CARD', this.canvas.width - 20, 45);
        ctx.fillStyle = '#ffd700';
        ctx.font = '12px Arial';
        ctx.fillText(schoolData.country, this.canvas.width - 20, 65);
        
        // Teacher photo
        const photoX = 30;
        const photoY = 100;
        const photoW = 150;
        const photoH = 180;
        
        if (uploadedPhoto) {
            ctx.drawImage(uploadedPhoto, photoX, photoY, photoW, photoH);
        } else {
            // Default photo placeholder
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(photoX, photoY, photoW, photoH);
            ctx.fillStyle = '#666666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Teacher', photoX + photoW/2, photoY + photoH/2 - 10);
            ctx.fillText('Photo', photoX + photoW/2, photoY + photoH/2 + 10);
        }
        
        // Photo border
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 3;
        ctx.strokeRect(photoX - 2, photoY - 2, photoW + 4, photoH + 4);
        
        // Teacher information
        const infoX = 200;
        const infoY = 100;
        
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Name:', infoX, infoY + 20);
        
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(teacherData.name.toUpperCase(), infoX, infoY + 50);
        
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Teacher ID:', infoX, infoY + 80);
        
        ctx.fillStyle = '#dc3545';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(teacherData.id, infoX, infoY + 105);
        
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Profession:', infoX, infoY + 135);
        
        ctx.font = '14px Arial';
        ctx.fillText(teacherData.profession, infoX, infoY + 160);
        
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Department:', infoX, infoY + 185);
        
        ctx.font = '14px Arial';
        const department = `${teacherData.profession.split(' ')[0]} Department`;
        ctx.fillText(department, infoX, infoY + 210);
        
        // Valid dates
        const today = new Date();
        const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate());
        
        ctx.font = '12px Arial';
        ctx.fillText(`Issue Date: ${today.toLocaleDateString()}`, 30, 320);
        ctx.fillText(`Valid Until: ${expiry.toLocaleDateString()}`, 30, 340);
        
        // Registration number
        const regNo = `REG/${schoolData.country.substring(0,2).toUpperCase()}/${Math.floor(Math.random() * 900000) + 100000}`;
        ctx.fillText(`Reg No: ${regNo}`, 300, 320);
        
        // QR Code placeholder
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.canvas.width - 110, this.canvas.height - 100, 80, 80);
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.canvas.width - 110, this.canvas.height - 100, 80, 80);
        
        ctx.fillStyle = '#1976d2';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR', this.canvas.width - 70, this.canvas.height - 55);
        
        // Security text
        ctx.fillStyle = '#1976d2';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('AUTHORIZED DOCUMENT', this.canvas.width - 20, this.canvas.height - 20);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Salary Receipt
    generateSalaryReceipt(teacherData, schoolData) {
        // Set canvas size for receipt
        this.canvas.width = 600;
        this.canvas.height = 380;
        
        const ctx = this.ctx;
        const countryData = COUNTRY_DATA[schoolData.country];
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header
        ctx.fillStyle = '#34495e';
        ctx.fillRect(0, 0, this.canvas.width, 70);
        
        // School logo area
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(15, 10, 45, 45);
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(15, 10, 45, 45);
        
        const schoolAbbr = schoolData.name.split(' ').map(word => word[0]).join('').substring(0, 3).toUpperCase();
        ctx.fillStyle = '#34495e';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(schoolAbbr, 37, 37);
        
        // Header text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(schoolData.name.toUpperCase(), 80, 25);
        
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('OFFICIAL SALARY RECEIPT', 80, 50);
        
        // Receipt details
        const receiptNo = `RCP/${schoolData.country.substring(0,2)}/${Math.floor(Math.random() * 900000) + 100000}`;
        const today = new Date();
        
        ctx.fillStyle = '#34495e';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`Receipt No: ${receiptNo}`, 20, 100);
        ctx.textAlign = 'right';
        ctx.fillText(`Date: ${today.toLocaleDateString()}`, this.canvas.width - 20, 100);
        
        // Teacher details
        ctx.fillStyle = '#34495e';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Teacher Details:', 20, 140);
        
        ctx.font = '14px Arial';
        ctx.fillText(`Name: ${teacherData.name}`, 30, 165);
        ctx.fillText(`ID: ${teacherData.id}`, 30, 185);
        ctx.fillText(`Profession: ${teacherData.profession}`, 30, 205);
        
        // Salary details
        const salaryRange = countryData.salaryRanges[teacherData.profession] || [50000, 80000];
        const baseSalary = Math.floor(Math.random() * (salaryRange[1] - salaryRange[0])) + salaryRange[0];
        const allowances = Math.floor(baseSalary * 0.4);
        const netSalary = baseSalary + allowances;
        
        ctx.fillText(`Base Salary: ${countryData.currency}${baseSalary.toLocaleString()}`, 300, 165);
        ctx.fillText(`Allowances: ${countryData.currency}${allowances.toLocaleString()}`, 300, 185);
        
        ctx.fillStyle = '#27ae60';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`Net Salary: ${countryData.currency}${netSalary.toLocaleString()}`, 300, 205);
        
        // Payment confirmation box
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 240, this.canvas.width - 40, 80);
        
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(20, 240, this.canvas.width - 40, 25);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('PAYMENT CONFIRMED', 30, 258);
        
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.fillText(`Transaction ID: TXN${Math.floor(Math.random() * 9000000) + 1000000}`, 30, 280);
        ctx.fillText(`Bank Reference: REF${Math.floor(Math.random() * 900000) + 100000}`, 30, 300);
        
        // Digital signature
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('Digitally Signed', this.canvas.width - 30, 280);
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        const signatory = countryData.signatories[Math.floor(Math.random() * countryData.signatories.length)];
        ctx.fillText(`By: ${signatory}`, this.canvas.width - 30, 300);
        
        // Footer
        ctx.fillStyle = '#34495e';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Generated on: ${today.toLocaleDateString()} | Country: ${schoolData.country} | Authorized Document`, 20, this.canvas.height - 10);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Employment Certificate
    generateCertificate(teacherData, schoolData) {
        // Set canvas size for certificate
        this.canvas.width = 600;
        this.canvas.height = 400;
        
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Border
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        
        // Inner border
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 1;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        
        // Header
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('EMPLOYMENT CERTIFICATE', this.canvas.width / 2, 60);
        
        // School name
        ctx.fillStyle = '#3498db';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(schoolData.name.toUpperCase(), this.canvas.width / 2, 90);
        
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '14px Arial';
        ctx.fillText(`${schoolData.location}, ${schoolData.country}`, this.canvas.width / 2, 110);
        
        // Certificate body
        ctx.fillStyle = '#2c3e50';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('This is to certify that', this.canvas.width / 2, 150);
        
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(teacherData.name.toUpperCase(), this.canvas.width / 2, 180);
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = '16px Arial';
        ctx.fillText(`has been employed as ${teacherData.profession}`, this.canvas.width / 2, 210);
        ctx.fillText(`at our institution since ${new Date(2020, 0, 1).toLocaleDateString()}`, this.canvas.width / 2, 235);
        
        ctx.fillText('and is in good standing with excellent performance.', this.canvas.width / 2, 270);
        
        // Date and signature
        const today = new Date();
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Date: ${today.toLocaleDateString()}`, 50, 320);
        
        ctx.textAlign = 'right';
        ctx.fillText('Principal/Administrator', this.canvas.width - 50, 320);
        
        const countryData = COUNTRY_DATA[schoolData.country];
        const signatory = countryData.signatories[Math.floor(Math.random() * countryData.signatories.length)];
        ctx.font = 'bold 16px Arial';
        ctx.fillText(signatory, this.canvas.width - 50, 340);
        
        // Certificate number
        const certNo = `CERT/${schoolData.country.substring(0,2)}/${Math.floor(Math.random() * 900000) + 100000}`;
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Certificate No: ${certNo}`, this.canvas.width / 2, this.canvas.height - 30);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Set uploaded photos
    setUploadedPhotos(photos) {
        this.uploadedPhotos = photos;
    }

    // Generate Academic Transcript
    generateTranscript(teacherData, schoolData) {
        // Set canvas size for transcript
        this.canvas.width = 800;
        this.canvas.height = 1000;
        
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header
        ctx.fillStyle = '#1976d2';
        ctx.fillRect(0, 0, this.canvas.width, 100);
        
        // School name and logo
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(schoolData.name.toUpperCase(), this.canvas.width / 2, 40);
        
        ctx.font = '16px Arial';
        ctx.fillText('OFFICIAL ACADEMIC TRANSCRIPT', this.canvas.width / 2, 70);
        
        // Student information section
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('STUDENT INFORMATION', 50, 150);
        
        // Draw line under heading
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 160);
        ctx.lineTo(this.canvas.width - 50, 160);
        ctx.stroke();
        
        // Student details
        ctx.font = '16px Arial';
        ctx.fillStyle = '#444444';
        ctx.fillText(`Name: ${teacherData.name}`, 50, 190);
        ctx.fillText(`Student ID: ${teacherData.id}`, 400, 190);
        ctx.fillText(`Date of Birth: ${this.formatDate(new Date(1985 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)))}`, 50, 220);
        ctx.fillText(`Nationality: ${schoolData.country}`, 400, 220);
        
        // Academic record section
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#333333';
        ctx.fillText('ACADEMIC RECORD', 50, 280);
        
        // Draw line under heading
        ctx.beginPath();
        ctx.moveTo(50, 290);
        ctx.lineTo(this.canvas.width - 50, 290);
        ctx.stroke();
        
        // Academic details - using AI-powered degree suggestions with fallback
        const degree = teacherData.degree || safeAICall('generateRandomDegree', 'Bachelor of Education', teacherData.profession);
        const major = teacherData.profession.replace(' Teacher', '');
        ctx.font = '16px Arial';
        ctx.fillStyle = '#444444';
        ctx.fillText(`Degree: ${degree}`, 50, 320);
        ctx.fillText(`Major: ${major}`, 400, 320);
        ctx.fillText(`Graduation Date: ${this.formatDate(new Date())}`, 50, 350);
        
        // GPA calculation
        const gpa = (3.0 + Math.random() * 1.0).toFixed(2);
        ctx.fillText(`Overall GPA: ${gpa}/4.0`, 400, 350);
        
        // Grade table header
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#1976d2';
        ctx.fillRect(50, 390, this.canvas.width - 100, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Course Code', 70, 410);
        ctx.fillText('Course Title', 200, 410);
        ctx.fillText('Credits', 500, 410);
        ctx.fillText('Grade', 600, 410);
        ctx.fillText('Points', 700, 410);
        
        // Sample courses - using AI-powered course suggestions with fallbacks
        const courses = [
            { code: 'EDU101', title: safeAICall('generateRandomCourse', 'Educational Foundations', teacherData.profession), credits: 3, grade: 'A' },
            { code: 'EDU201', title: safeAICall('generateRandomCourse', 'Teaching Methods', teacherData.profession), credits: 4, grade: 'A-' },
            { code: 'EDU301', title: safeAICall('generateRandomCourse', 'Curriculum Development', teacherData.profession), credits: 3, grade: 'B+' },
            { code: 'EDU401', title: 'Assessment & Evaluation', credits: 3, grade: 'A' },
            { code: 'EDU501', title: 'Educational Research', credits: 2, grade: 'A-' },
        ];
        
        ctx.fillStyle = '#444444';
        ctx.font = '14px Arial';
        let yPos = 440;
        courses.forEach(course => {
            ctx.fillText(course.code, 70, yPos);
            ctx.fillText(course.title, 200, yPos);
            ctx.fillText(course.credits.toString(), 510, yPos);
            ctx.fillText(course.grade, 610, yPos);
            ctx.fillText('4.0', 710, yPos);
            yPos += 25;
        });
        
        // Certification section
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#333333';
        ctx.fillText('CERTIFICATION', 50, 600);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#444444';
        ctx.fillText('This is to certify that the above transcript is a true and accurate', 50, 630);
        ctx.fillText('record of the academic achievement of the named student.', 50, 650);
        
        // Signature and date
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Registrar Signature: ___________________', 50, 700);
        ctx.fillText(`Date: ${this.formatDate(new Date())}`, 400, 700);
        
        // Seal/Watermark
        ctx.fillStyle = 'rgba(25, 118, 210, 0.1)';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('OFFICIAL', this.canvas.width / 2, this.canvas.height / 2);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Degree Certificate
    generateDegree(teacherData, schoolData) {
        // Set canvas size for degree certificate
        this.canvas.width = 1000;
        this.canvas.height = 700;
        
        const ctx = this.ctx;
        
        // Clear canvas with elegant background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#ffffff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Decorative border
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
        
        // Header section
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText(schoolData.name.toUpperCase(), this.canvas.width / 2, 120);
        
        ctx.font = '20px serif';
        ctx.fillText(`${schoolData.location}, ${schoolData.country}`, this.canvas.width / 2, 150);
        
        // Certificate title
        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 48px serif';
        ctx.fillText('CERTIFICATE', this.canvas.width / 2, 220);
        
        // Degree type - using AI-powered suggestions with fallback
        const degreeType = teacherData.degree || safeAICall('generateRandomDegree', 'Bachelor of Education', teacherData.profession);
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 28px serif';
        ctx.fillText(degreeType, this.canvas.width / 2, 270);
        
        // Specialization
        const specialization = teacherData.profession.replace(' Teacher', ' Education');
        ctx.font = '24px serif';
        ctx.fillText(`in ${specialization}`, this.canvas.width / 2, 310);
        
        // Conferral text
        ctx.font = '18px serif';
        ctx.fillStyle = '#444444';
        ctx.fillText('This is to certify that', this.canvas.width / 2, 360);
        
        // Graduate name
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 32px serif';
        ctx.fillText(teacherData.name.toUpperCase(), this.canvas.width / 2, 400);
        
        // Completion text
        ctx.fillStyle = '#444444';
        ctx.font = '18px serif';
        ctx.fillText('has successfully completed all requirements for the degree of', this.canvas.width / 2, 430);
        ctx.fillText(`${degreeType} and is hereby granted this certificate`, this.canvas.width / 2, 460);
        ctx.fillText('with all rights and privileges thereunto appertaining.', this.canvas.width / 2, 490);
        
        // Date and signatures
        ctx.font = '16px serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Conferred on: ${this.formatDate(new Date())}`, 100, 560);
        
        ctx.textAlign = 'right';
        ctx.fillText('Dean Signature: ___________________', this.canvas.width - 100, 580);
        ctx.fillText('Registrar: ___________________', this.canvas.width - 100, 610);
        
        // Registration number
        ctx.textAlign = 'center';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(`Certificate No: ${schoolData.country.substring(0,2).toUpperCase()}${Date.now().toString().slice(-6)}`, this.canvas.width / 2, 650);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Course Completion Certificate
    generateCourseCompletion(teacherData, schoolData) {
        // Set canvas size for course completion certificate
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Decorative border
        ctx.strokeStyle = '#28a745';
        ctx.lineWidth = 6;
        ctx.strokeRect(15, 15, this.canvas.width - 30, this.canvas.height - 30);
        
        // Header background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 100);
        gradient.addColorStop(0, '#28a745');
        gradient.addColorStop(1, '#20c997');
        ctx.fillStyle = gradient;
        ctx.fillRect(30, 30, this.canvas.width - 60, 80);
        
        // Certificate title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF COMPLETION', this.canvas.width / 2, 80);
        
        // Institution name
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(schoolData.name, this.canvas.width / 2, 150);
        
        // Course information - using AI-powered suggestions with fallback
        const courseName = safeAICall('generateRandomTraining', 'Professional Development Course', null);
        
        ctx.font = '18px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText('This is to certify that', this.canvas.width / 2, 200);
        
        // Participant name
        ctx.fillStyle = '#28a745';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(teacherData.name, this.canvas.width / 2, 240);
        
        // Course details
        ctx.fillStyle = '#333333';
        ctx.font = '18px Arial';
        ctx.fillText('has successfully completed the course', this.canvas.width / 2, 280);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#1976d2';
        ctx.fillText(`"${courseName}"`, this.canvas.width / 2, 320);
        
        // Duration and date
        const duration = [20, 40, 60, 80][Math.floor(Math.random() * 4)];
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(`Duration: ${duration} hours`, this.canvas.width / 2, 360);
        ctx.fillText(`Completed on: ${this.formatDate(new Date())}`, this.canvas.width / 2, 385);
        
        // Signature section
        ctx.textAlign = 'left';
        ctx.font = '14px Arial';
        ctx.fillText('Instructor: ___________________', 100, 450);
        ctx.fillText(`Date: ${this.formatDate(new Date())}`, 100, 480);
        
        ctx.textAlign = 'right';
        ctx.fillText('Director: ___________________', this.canvas.width - 100, 450);
        ctx.fillText('Institution Seal', this.canvas.width - 100, 480);
        
        // Course ID
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText(`Course ID: ${schoolData.country.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-4)}`, this.canvas.width / 2, 540);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Teacher Training Certificate
    generateTraining(teacherData, schoolData) {
        // Set canvas size for training certificate
        this.canvas.width = 850;
        this.canvas.height = 650;
        
        const ctx = this.ctx;
        
        // Clear canvas with professional background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Professional border design
        ctx.strokeStyle = '#6f42c1';
        ctx.lineWidth = 8;
        ctx.strokeRect(25, 25, this.canvas.width - 50, this.canvas.height - 50);
        
        ctx.strokeStyle = '#ffc107';
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, this.canvas.width - 80, this.canvas.height - 80);
        
        // Header section
        ctx.fillStyle = '#6f42c1';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PROFESSIONAL DEVELOPMENT', this.canvas.width / 2, 90);
        
        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#ffc107';
        ctx.fillText('TRAINING CERTIFICATE', this.canvas.width / 2, 130);
        
        // Training provider
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(schoolData.name, this.canvas.width / 2, 170);
        ctx.font = '16px Arial';
        ctx.fillText(`${schoolData.location}, ${schoolData.country}`, this.canvas.width / 2, 195);
        
        // Certification text
        ctx.font = '18px Arial';
        ctx.fillStyle = '#555555';
        ctx.fillText('This certificate is awarded to', this.canvas.width / 2, 250);
        
        // Trainee name
        ctx.fillStyle = '#6f42c1';
        ctx.font = 'bold 32px Arial';
        ctx.fillText(teacherData.name, this.canvas.width / 2, 290);
        
        // Training details - using AI-powered suggestions with fallback
        const trainingName = safeAICall('generateRandomTraining', 'Professional Teaching Methods', null);
        
        ctx.fillStyle = '#333333';
        ctx.font = '18px Arial';
        ctx.fillText('for successful completion of the training program', this.canvas.width / 2, 330);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#1976d2';
        ctx.fillText(`"${trainingName}"`, this.canvas.width / 2, 370);
        
        // Training details
        const trainingHours = [40, 60, 80, 120][Math.floor(Math.random() * 4)];
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(`Training Duration: ${trainingHours} hours`, this.canvas.width / 2, 410);
        ctx.fillText(`Certification Level: Professional`, this.canvas.width / 2, 435);
        
        // Date and credentials
        ctx.textAlign = 'left';
        ctx.font = '14px Arial';
        ctx.fillText(`Issued Date: ${this.formatDate(new Date())}`, 80, 490);
        ctx.fillText('Training Coordinator: ___________________', 80, 520);
        
        ctx.textAlign = 'right';
        ctx.fillText(`Valid Until: ${this.formatDate(new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000))}`, this.canvas.width - 80, 490);
        ctx.fillText('Director: ___________________', this.canvas.width - 80, 520);
        
        // Certificate number
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText(`Certificate No: TR-${schoolData.country.substring(0,2).toUpperCase()}-${Date.now().toString().slice(-6)}`, this.canvas.width / 2, 580);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Generate Conference Attendance Certificate
    generateConference(teacherData, schoolData) {
        // Set canvas size for conference certificate
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Modern gradient background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#e9ecef');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Border design
        ctx.strokeStyle = '#fd7e14';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        
        // Header
        ctx.fillStyle = '#fd7e14';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF ATTENDANCE', this.canvas.width / 2, 80);
        
        // Conference details - using AI-powered suggestions with fallback
        const conferenceName = safeAICall('generateRandomConference', 'Educational Excellence Conference', null);
        
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(conferenceName, this.canvas.width / 2, 130);
        
        // Organizing institution
        ctx.fillStyle = '#333333';
        ctx.font = '18px Arial';
        ctx.fillText(`Organized by ${schoolData.name}`, this.canvas.width / 2, 160);
        ctx.font = '16px Arial';
        ctx.fillText(`${schoolData.location}, ${schoolData.country}`, this.canvas.width / 2, 185);
        
        // Attendee information
        ctx.font = '18px Arial';
        ctx.fillStyle = '#555555';
        ctx.fillText('This certificate is presented to', this.canvas.width / 2, 240);
        
        // Attendee name
        ctx.fillStyle = '#fd7e14';
        ctx.font = 'bold 30px Arial';
        ctx.fillText(teacherData.name, this.canvas.width / 2, 280);
        
        // Attendance details
        ctx.fillStyle = '#333333';
        ctx.font = '18px Arial';
        ctx.fillText('for active participation in the conference', this.canvas.width / 2, 320);
        
        // Conference dates
        const conferenceDate = new Date();
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(`Conference Date: ${this.formatDate(conferenceDate)}`, this.canvas.width / 2, 360);
        ctx.fillText('Duration: 2 Days', this.canvas.width / 2, 385);
        
        // Professional development hours
        ctx.fillText('Professional Development Hours: 16', this.canvas.width / 2, 410);
        
        // Signature section
        ctx.textAlign = 'left';
        ctx.font = '14px Arial';
        ctx.fillText('Conference Chair: ___________________', 80, 470);
        ctx.fillText(`Date: ${this.formatDate(new Date())}`, 80, 500);
        
        ctx.textAlign = 'right';
        ctx.fillText('Organizing Committee: ___________________', this.canvas.width - 80, 470);
        ctx.fillText('Official Seal', this.canvas.width - 80, 500);
        
        // Conference ID
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText(`Conference ID: CONF-${Date.now().toString().slice(-6)}`, this.canvas.width / 2, 550);
        
        return this.canvas.toDataURL('image/jpeg', 0.9);
    }

    // Helper method to format dates
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Helper method to render digital signature
    renderDigitalSignature(ctx, signature, x, y, maxWidth = 200) {
        if (!signature) return;
        
        ctx.save();
        
        // Apply signature styling
        ctx.font = `${signature.weight || 'normal'} ${signature.size || 16}px ${signature.font || 'cursive'}`;
        ctx.fillStyle = '#1a1a1a';
        
        // Apply slant transformation
        if (signature.slant) {
            const angle = (signature.slant * Math.PI) / 180;
            ctx.transform(1, 0, Math.tan(angle), 1, 0, 0);
        }
        
        // Render signature text
        ctx.textAlign = 'left';
        ctx.fillText(signature.text, x, y);
        
        ctx.restore();
    }

    // Enhanced QR Code generation placeholder
    generateQRCode(data) {
        // This would integrate with an actual QR code library
        // For now, return a placeholder
        return {
            dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
            data: data
        };
    }
}

// Initialize document generator
const documentGenerator = new DocumentGenerator();
