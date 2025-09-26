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
}

// Initialize document generator
const documentGenerator = new DocumentGenerator();
