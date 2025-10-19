// Nonprofit Certificate Generator - Complete Implementation
// Updated for USA with auto-generated EIN and 2-year-old dates
class NonprofitCertificateGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    // Helper method to generate a date 2 years old (October 2023)
    getOldDate() {
        // Current date is 2025-10-19, so 2 years ago would be 2023-10-19
        return new Date('2023-10-19T10:25:42Z');
    }

    // Helper method to format dates
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Helper method to generate fake USA EIN (Employer Identification Number)
    generateFakeEIN() {
        const firstTwo = Math.floor(Math.random() * 90) + 10; // 10-99
        const lastSeven = Math.floor(Math.random() * 9000000) + 1000000; // 1000000-9999999
        return `${firstTwo}-${lastSeven}`;
    }

    // Helper method to generate fake PAN number (India)
    generateFakePAN() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const firstThree = 'AAA'; // First 3 letters (typically AAA for trusts)
        const fourthLetter = 'T'; // Fourth letter (T for Trust, P for Person, C for Company, etc.)
        const fifthLetter = letters.charAt(Math.floor(Math.random() * 26)); // Random letter
        const fourDigits = String(Math.floor(Math.random() * 9000) + 1000); // 4 random digits
        const lastLetter = letters.charAt(Math.floor(Math.random() * 26)); // Random letter
        
        return `${firstThree}${fourthLetter}${fifthLetter}${fourDigits}${lastLetter}`;
    }

    // Helper method to generate fake registration number for 12A
    generateFake12ARegNo() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return `AAATX${Math.floor(Math.random() * 9000) + 1000}${letters.charAt(Math.floor(Math.random() * 26))}`;
    }

    // Helper method to generate fake UK Charity Number
    generateFakeUKCharityNumber() {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    // Helper method to generate fake Canada BN
    generateFakeCanadaBN() {
        return `${Math.floor(Math.random() * 900000000) + 100000000} RR 0001`;
    }

    // Helper method to generate fake Australia ABN
    generateFakeAustraliaABN() {
        return `${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`;
    }

    // Helper method to generate fake Kenya NGO Number
    generateFakeKenyaNGONumber() {
        return `NGO/R/${Math.floor(Math.random() * 90000) + 10000}`;
    }

    // Helper method to generate fake Pakistan Company Number
    generateFakePakistanCompanyNumber() {
        return String(Math.floor(Math.random() * 9000000) + 1000000);
    }

    // Helper method to generate fake Nepal SWC Number
    generateFakeNepalSWCNumber() {
        const num = Math.floor(Math.random() * 900) + 100;
        return `SWC/${num}/2023`;
    }

    // Helper method to generate fake Nigeria IT Number
    generateFakeNigeriaITNumber() {
        return `IT/${Math.floor(Math.random() * 90000) + 10000}`;
    }

    // Helper method to generate fake Philippines SEC Number
    generateFakePhilippinesSECNumber() {
        return `CS2023${Math.floor(Math.random() * 90000) + 10000}`;
    }

    // ========== INDIA CERTIFICATES ==========

    // Generate 12A Registration Certificate (India)
    generate12ACertificate(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Indian Tricolor Header
        ctx.fillStyle = '#FF9933'; // Saffron
        ctx.fillRect(0, 0, this.canvas.width, 60);
        ctx.fillStyle = '#ffffff'; // White
        ctx.fillRect(0, 60, this.canvas.width, 60);
        ctx.fillStyle = '#138808'; // Green
        ctx.fillRect(0, 120, this.canvas.width, 60);
        
        // Ashoka Chakra (simplified)
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('☸', this.canvas.width / 2, 105);
        
        // Government Header
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('INCOME TAX DEPARTMENT', this.canvas.width / 2, 220);
        ctx.font = 'bold 24px Arial';
        ctx.fillText('GOVERNMENT OF INDIA', this.canvas.width / 2, 250);
        
        // Certificate Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('CERTIFICATE OF REGISTRATION', this.canvas.width / 2, 310);
        ctx.font = 'bold 24px Arial';
        ctx.fillText('Under Section 12A', this.canvas.width / 2, 345);
        ctx.fillText('Income Tax Act, 1961', this.canvas.width / 2, 375);
        
        // Registration Number - AUTO GENERATED
        const regNo = this.generateFake12ARegNo();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Registration No: ${regNo}`, this.canvas.width / 2, 430);
        
        // Organization Details
        ctx.textAlign = 'left';
        ctx.font = '18px Arial';
        ctx.fillText('This is to certify that:', 100, 490);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#000080';
        ctx.fillText(orgData.name.toUpperCase(), 150, 530);
        
        // Use auto-generated PAN if not provided
        const panNumber = orgData.pan || this.generateFakePAN();
        
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 150, 570);
        ctx.fillText(`PAN: ${panNumber}`, 150, 600);
        
        // Use old date (2 years ago)
        const oldDate = this.getOldDate();
        ctx.fillText(`Registration Date: ${this.formatDate(oldDate)}`, 150, 630);
        
        // Certificate Body
        ctx.font = '16px Arial';
        ctx.fillText('has been registered under Section 12A of the Income Tax Act, 1961', 100, 690);
        ctx.fillText('for the purposes of claiming exemption under Section 11 and 12.', 100, 720);
        ctx.fillText('This registration is valid from Financial Year 2023-24 onwards', 100, 750);
        ctx.fillText('subject to the provisions of the Income Tax Act.', 100, 780);
        
        // Signature Section
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Digitally Signed by:', 100, 860);
        ctx.font = '18px Arial';
        ctx.fillText('Commissioner of Income Tax (Exemptions)', 100, 890);
        ctx.fillText(orgData.city || 'New Delhi', 100, 920);
        
        // Official Seal
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(650, 880, 60, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('INCOME TAX', 650, 870);
        ctx.fillText('DEPARTMENT', 650, 885);
        ctx.fillText('INDIA', 650, 900);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // Generate 80G Certificate (India)
    generate80GCertificate(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Indian Tricolor Header
        ctx.fillStyle = '#FF9933';
        ctx.fillRect(0, 0, this.canvas.width, 50);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 50, this.canvas.width, 50);
        ctx.fillStyle = '#138808';
        ctx.fillRect(0, 100, this.canvas.width, 50);
        
        // Ashoka Chakra
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 35px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('☸', this.canvas.width / 2, 90);
        
        // Header
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('INCOME TAX DEPARTMENT', this.canvas.width / 2, 200);
        ctx.font = 'bold 22px Arial';
        ctx.fillText('GOVERNMENT OF INDIA', this.canvas.width / 2, 230);
        
        // Certificate Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('CERTIFICATE UNDER SECTION 80G', this.canvas.width / 2, 290);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Income Tax Act, 1961', this.canvas.width / 2, 320);
        
        // Registration Number - Use old year
        const oldDate = this.getOldDate();
        const regNo = `80G/${Math.floor(Math.random() * 9000) + 1000}/${oldDate.getFullYear()}`;
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`Registration No: ${regNo}`, this.canvas.width / 2, 370);
        
        // Organization Details
        ctx.textAlign = 'left';
        ctx.font = '17px Arial';
        ctx.fillText('This is to certify that:', 100, 430);
        
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#000080';
        ctx.fillText(orgData.name.toUpperCase(), 150, 470);
        
        // Use auto-generated PAN if not provided
        const panNumber = orgData.pan || this.generateFakePAN();
        
        ctx.fillStyle = '#000000';
        ctx.font = '17px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 150, 510);
        ctx.fillText(`PAN: ${panNumber}`, 150, 540);
        
        // Exemption Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Tax Exemption Details:', 100, 600);
        ctx.font = '16px Arial';
        ctx.fillText('• Donations are eligible for 50% deduction under Section 80G', 120, 635);
        ctx.fillText('• Valid for contributions made from AY 2023-24 onwards', 120, 665);
        ctx.fillText('• Subject to provisions of Income Tax Act, 1961', 120, 695);
        
        // Validity - Use old dates
        const issueDate = oldDate;
        const validUntil = new Date(issueDate.getFullYear() + 5, issueDate.getMonth(), issueDate.getDate());
        ctx.fillText(`Issue Date: ${this.formatDate(issueDate)}`, 100, 750);
        ctx.fillText(`Valid Until: ${this.formatDate(validUntil)}`, 100, 780);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Authorized Signatory:', 100, 860);
        ctx.font = '17px Arial';
        ctx.fillText('Commissioner of Income Tax (Exemptions)', 100, 890);
        
        // Official Seal
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(650, 870, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('INCOME TAX', 650, 865);
        ctx.fillText('80G', 650, 880);
        ctx.fillText('INDIA', 650, 895);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // Generate NGO Darpan ID (India)
    generateNGODarpanID(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 600;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#f0f8ff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header Background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 100);
        gradient.addColorStop(0, '#FF9933');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#138808');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, 100);
        
        // Title
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('NGO DARPAN', this.canvas.width / 2, 45);
        ctx.font = 'bold 18px Arial';
        ctx.fillText('NITI Aayog, Government of India', this.canvas.width / 2, 75);
        
        // Border
        ctx.strokeStyle = '#FF9933';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        
        // NGO Darpan ID - Use old year
        const oldDate = this.getOldDate();
        const darpanId = `${orgData.state || 'MH'}/${oldDate.getFullYear()}/${Math.floor(Math.random() * 900000) + 100000}`;
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(`ID: ${darpanId}`, this.canvas.width / 2, 160);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), this.canvas.width / 2, 220);
        
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Registration No: ${orgData.registrationNo || this.generateFake12ARegNo()}`, 100, 280);
        ctx.fillText(`Type: ${orgData.type || 'Trust/Society/Section 8 Company'}`, 100, 315);
        ctx.fillText(`State: ${orgData.state || 'Maharashtra'}`, 100, 350);
        ctx.fillText(`City: ${orgData.city || 'Mumbai'}`, 100, 385);
        
        // Registration Date - Use old date
        ctx.fillText(`Registered on NGO Darpan: ${this.formatDate(oldDate)}`, 100, 430);
        
        // QR Code Placeholder
        ctx.strokeStyle = '#000080';
        ctx.lineWidth = 2;
        ctx.strokeRect(600, 400, 120, 120);
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR CODE', 660, 465);
        
        // Footer
        ctx.font = '12px Arial';
        ctx.fillText('Verify at: https://ngodarpan.gov.in', this.canvas.width / 2, 560);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // Generate FCRA Certificate (India)
    generateFCRACertificate(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Government Emblem
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚖', this.canvas.width / 2, 80);
        
        // Header
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('MINISTRY OF HOME AFFAIRS', this.canvas.width / 2, 140);
        ctx.font = 'bold 22px Arial';
        ctx.fillText('GOVERNMENT OF INDIA', this.canvas.width / 2, 170);
        
        // Title
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('FCRA REGISTRATION CERTIFICATE', this.canvas.width / 2, 230);
        ctx.font = '18px Arial';
        ctx.fillText('Foreign Contribution (Regulation) Act, 2010', this.canvas.width / 2, 260);
        
        // Border
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Registration Number - AUTO GENERATED
        const fcraNo = `${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 9000000) + 1000000}`;
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`FCRA Registration No: ${fcraNo}`, this.canvas.width / 2, 320);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Organization Name:', 100, 380);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(orgData.name, 100, 410);
        
        // Use auto-generated PAN if not provided
        const panNumber = orgData.pan || this.generateFakePAN();
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 100, 450);
        ctx.fillText(`PAN: ${panNumber}`, 100, 485);
        
        // FCRA Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('FCRA Registration Details:', 100, 540);
        ctx.font = '16px Arial';
        ctx.fillText('• Authorized to receive foreign contributions', 120, 575);
        ctx.fillText('• Must maintain separate FCRA bank account', 120, 605);
        ctx.fillText('• Annual returns mandatory', 120, 635);
        ctx.fillText('• Valid for receipt of foreign funds', 120, 665);
        
        // Validity - Use old dates
        const oldDate = this.getOldDate();
        const validUntil = new Date(oldDate.getFullYear() + 5, oldDate.getMonth(), oldDate.getDate());
        ctx.fillText(`Registration Date: ${this.formatDate(oldDate)}`, 100, 720);
        ctx.fillText(`Valid Until: ${this.formatDate(validUntil)}`, 100, 750);
        ctx.fillText('(Subject to renewal as per FCRA provisions)', 100, 780);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Authorized by:', 100, 860);
        ctx.font = '17px Arial';
        ctx.fillText('Under Secretary to the Government of India', 100, 890);
        ctx.fillText('FCRA Wing, Ministry of Home Affairs', 100, 920);
        
        // Seal
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(650, 880, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('MHA', 650, 875);
        ctx.fillText('FCRA', 650, 890);
        ctx.fillText('INDIA', 650, 905);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // Generate Trust Deed (India)
    generateTrustDeed(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 1100;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#fffef0';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Border
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 32px serif';
        ctx.textAlign = 'center';
        ctx.fillText('TRUST DEED', this.canvas.width / 2, 80);
        
        ctx.fillStyle = '#000000';
        ctx.font = '18px serif';
        ctx.fillText('Registered under the Indian Trusts Act, 1882', this.canvas.width / 2, 115);
        
        // Registration Details - Use old year
        const oldDate = this.getOldDate();
        const regNo = `${orgData.state || 'MH'}/TRUST/${Math.floor(Math.random() * 9000) + 1000}/${oldDate.getFullYear()}`;
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`Registration No: ${regNo}`, this.canvas.width / 2, 155);
        
        // Trust Name
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 24px serif';
        ctx.fillText(orgData.name.toUpperCase(), this.canvas.width / 2, 210);
        
        // Document Body
        ctx.fillStyle = '#000000';
        ctx.font = '16px serif';
        ctx.textAlign = 'left';
        
        const content = [
            'THIS DEED OF TRUST is made on this day of ' + this.formatDate(oldDate),
            '',
            'BY AND BETWEEN:',
            '',
            `The Trustees of ${orgData.name}, having its registered office at`,
            `${orgData.address}`,
            '',
            'WITNESSETH:',
            '',
            'WHEREAS the Trustees have decided to establish a Public Charitable Trust',
            'for the promotion of education, relief of poverty, and advancement of any',
            'other object of general public utility.',
            '',
            'NOW THIS DEED WITNESSETH AS FOLLOWS:',
            '',
            '1. NAME: The Trust shall be known as "' + orgData.name + '"',
            '',
            '2. REGISTERED OFFICE: The registered office of the Trust shall be situated at',
            `   ${orgData.address}`,
            '',
            '3. OBJECTS: The objects for which the Trust is established are charitable',
            '   in nature and include education, healthcare, and social welfare.',
            '',
            '4. TRUSTEES: The Trust shall be managed by a Board of Trustees.',
            '',
            '5. VALIDITY: This Trust Deed shall remain in force perpetually.'
        ];
        
        let yPos = 280;
        content.forEach(line => {
            ctx.fillText(line, 80, yPos);
            yPos += 25;
        });
        
        // Signature Section
        yPos += 30;
        ctx.font = 'bold 16px Arial';
        ctx.fillText('IN WITNESS WHEREOF:', 80, yPos);
        
        yPos += 50;
        ctx.font = '14px Arial';
        ctx.fillText('Trustee 1: ____________________', 100, yPos);
        ctx.fillText('Witness 1: ____________________', 450, yPos);
        
        yPos += 50;
        ctx.fillText('Trustee 2: ____________________', 100, yPos);
        ctx.fillText('Witness 2: ____________________', 450, yPos);
        
        // Registrar Seal
        yPos += 80;
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.canvas.width / 2, yPos, 60, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('REGISTRAR', this.canvas.width / 2, yPos - 5);
        ctx.fillText('OF TRUSTS', this.canvas.width / 2, yPos + 10);
        ctx.fillText(orgData.state || 'MAHARASHTRA', this.canvas.width / 2, yPos + 25);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // Generate PAN Card (India)
    generatePANCard(orgData) {
        // Standard PAN card size (scaled)
        this.canvas.width = 640;
        this.canvas.height = 400;
        const ctx = this.ctx;
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#e3f2fd');
        gradient.addColorStop(1, '#bbdefb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Border
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        
        // Header
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('INCOME TAX DEPARTMENT', 30, 40);
        ctx.font = '12px Arial';
        ctx.fillText('GOVT. OF INDIA', 30, 60);
        
        // Ashoka Emblem
        ctx.fillStyle = '#FF9933';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('☸', this.canvas.width - 40, 55);
        
        // PAN Title
        ctx.fillStyle = '#1976d2';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Permanent Account Number Card', 30, 100);
        
        // PAN Number - AUTO GENERATED if not provided
        const panNo = orgData.pan || this.generateFakePAN();
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 32px monospace';
        ctx.fillText(panNo, 30, 150);
        
        // Organization Name
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Name:', 30, 200);
        ctx.font = '16px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 30, 230);
        
        // Father's Name / Trust Name
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Trust/Organization:', 30, 270);
        ctx.font = '13px Arial';
        ctx.fillText(orgData.type || 'Public Charitable Trust', 30, 295);
        
        // Date of Registration - Use old date
        const oldDate = this.getOldDate();
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Date of Issue:', 30, 330);
        ctx.font = '13px Arial';
        ctx.fillText(this.formatDate(oldDate), 30, 355);
        
        // Signature
        ctx.font = 'italic 12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText('Authorized Signatory', this.canvas.width - 30, 370);
        
        // QR Code placeholder
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.canvas.width - 130, 200, 100, 100);
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR', this.canvas.width - 80, 255);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== USA CERTIFICATES ==========

    // Generate 501(c)(3) Certificate (USA)
    generate501c3Certificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1100;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // IRS Header
        ctx.fillStyle = '#003366';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('INTERNAL REVENUE SERVICE', this.canvas.width / 2, 80);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Department of the Treasury', this.canvas.width / 2, 110);
        ctx.fillText('United States of America', this.canvas.width / 2, 140);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('DETERMINATION LETTER', this.canvas.width / 2, 200);
        ctx.font = 'bold 22px Arial';
        ctx.fillText('Section 501(c)(3) Status', this.canvas.width / 2, 230);
        
        // Border
        ctx.strokeStyle = '#003366';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // EIN - AUTO GENERATED if not provided
        const ein = orgData.ein || this.generateFakeEIN();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`EIN: ${ein}`, this.canvas.width / 2, 280);
        
        // Organization Details
        ctx.textAlign = 'left';
        ctx.font = '18px Arial';
        ctx.fillText('Organization Name:', 80, 340);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(orgData.name, 80, 370);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 80, 410);
        ctx.fillText(`City: ${orgData.city}, State: ${orgData.state || 'NY'}`, 80, 445);
        
        // Determination Letter Content
        ctx.font = '16px Arial';
        const content = [
            'Dear Applicant:',
            '',
            'We are pleased to inform you that upon review of your application for tax-exempt',
            'status, we have determined that you are exempt from Federal income tax under',
            'section 501(c)(3) of the Internal Revenue Code.',
            '',
            'Contributions to your organization are deductible under section 170 of the Code.',
            'You are also qualified to receive tax deductible bequests, devises, transfers or',
            'gifts under section 2055, 2106, or 2522 of the Code.',
            '',
            'This determination is based on the information you provided in your application.',
            'If your purposes, character, or method of operation change, please let us know',
            'so we can consider the effect of the change on your exempt status.',
            '',
            'Please keep this letter in your permanent records.'
        ];
        
        let yPos = 510;
        content.forEach(line => {
            ctx.fillText(line, 80, yPos);
            yPos += 28;
        });
        
        // Effective Date - Use old date
        const oldDate = this.getOldDate();
        yPos += 30;
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`Effective Date: ${this.formatDate(oldDate)}`, 80, yPos);
        
        // Signature
        yPos += 80;
        ctx.font = '16px Arial';
        ctx.fillText('Sincerely yours,', 80, yPos);
        yPos += 50;
        ctx.font = 'italic 18px Arial';
        ctx.fillText('Director, Exempt Organizations', 80, yPos);
        
        // IRS Seal
        ctx.strokeStyle = '#003366';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(700, yPos - 30, 60, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('IRS', 700, yPos - 35);
        ctx.fillText('EXEMPT', 700, yPos - 15);
        ctx.fillText('USA', 700, yPos + 5);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== UK CERTIFICATES ==========

    // Generate UK Charity Registration (UK)
    generateUKCharityRegistration(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 900;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header
        ctx.fillStyle = '#00247d';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CHARITY COMMISSION', this.canvas.width / 2, 70);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('for England and Wales', this.canvas.width / 2, 100);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('CERTIFICATE OF REGISTRATION', this.canvas.width / 2, 160);
        
        // Border
        ctx.strokeStyle = '#00247d';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Registration Number - AUTO GENERATED
        const charityNo = this.generateFakeUKCharityNumber();
        ctx.fillStyle = '#00247d';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Charity Number: ${charityNo}`, this.canvas.width / 2, 220);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 280);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 320);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 80, 370);
        ctx.fillText(`City: ${orgData.city || 'London'}`, 80, 405);
        
        // Registration Details - Use old date
        const oldDate = this.getOldDate();
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Registration Details:', 80, 470);
        ctx.font = '16px Arial';
        ctx.fillText(`• Registered as a Charitable Incorporated Organisation (CIO)`, 100, 510);
        ctx.fillText(`• Registration Date: ${this.formatDate(oldDate)}`, 100, 545);
        ctx.fillText(`• Governing Document: Constitution`, 100, 580);
        ctx.fillText(`• Registered with the Charity Commission`, 100, 615);
        
        // Objects
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Charitable Objects:', 80, 670);
        ctx.font = '16px Arial';
        ctx.fillText('The advancement of education, relief of poverty, and other', 100, 705);
        ctx.fillText('charitable purposes for the benefit of the public.', 100, 735);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Issued by:', 80, 810);
        ctx.font = '17px Arial';
        ctx.fillText('The Charity Commission for England and Wales', 80, 840);
        
        // Seal
        ctx.strokeStyle = '#00247d';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(650, 820, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CHARITY', 650, 815);
        ctx.fillText('COMMISSION', 650, 832);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== CANADA CERTIFICATES ==========

    // Generate Canada CRA Certificate
    generateCanadaCRACertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Canadian Flag Colors Header
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, 0, 100, 80);
        ctx.fillRect(this.canvas.width - 100, 0, 100, 80);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(100, 0, this.canvas.width - 200, 80);
        
        // Maple Leaf
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🍁', this.canvas.width / 2, 60);
        
        // Header (Bilingual)
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('CANADA REVENUE AGENCY', this.canvas.width / 2, 140);
        ctx.fillText('AGENCE DU REVENU DU CANADA', this.canvas.width / 2, 170);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('CHARITABLE REGISTRATION', this.canvas.width / 2, 230);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('ENREGISTREMENT COMME ORGANISME DE BIENFAISANCE', this.canvas.width / 2, 260);
        
        // Registration Number - AUTO GENERATED
        const bnNo = this.generateFakeCanadaBN();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`Registration Number / Numéro d'enregistrement: ${bnNo}`, this.canvas.width / 2, 320);
        
        // Organization Details
        ctx.textAlign = 'left';
        ctx.font = '18px Arial';
        ctx.fillText('Organization Name / Nom de l\'organisation:', 80, 380);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(orgData.name, 80, 410);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address / Adresse: ${orgData.address}`, 80, 450);
        ctx.fillText(`City / Ville: ${orgData.city || 'Toronto'}, Province: ${orgData.province || orgData.state || 'ON'}`, 80, 485);
        
        // Registration Details - Use old date
        const oldDate = this.getOldDate();
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Registration Status / Statut d\'enregistrement:', 80, 540);
        ctx.font = '16px Arial';
        ctx.fillText('• Registered Charity / Organisme de bienfaisance enregistré', 100, 575);
        ctx.fillText(`• Effective Date / Date d'entrée en vigueur: ${this.formatDate(oldDate)}`, 100, 610);
        ctx.fillText('• Eligible to issue tax receipts / Peut délivrer des reçus fiscaux', 100, 645);
        
        // Designation
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Designation:', 80, 700);
        ctx.font = '16px Arial';
        ctx.fillText('Charitable Organization / Organisation de bienfaisance', 100, 730);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Issued by / Délivré par:', 80, 850);
        ctx.font = '17px Arial';
        ctx.fillText('Canada Revenue Agency, Charities Directorate', 80, 880);
        
        // Seal
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 860, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CRA', 700, 855);
        ctx.fillText('CANADA', 700, 872);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== AUSTRALIA CERTIFICATES ==========

    // Generate Australia ACNC Certificate
    generateAustraliaACNCCertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 950;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Header
        ctx.fillStyle = '#002664';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('AUSTRALIAN CHARITIES AND', this.canvas.width / 2, 70);
        ctx.fillText('NOT-FOR-PROFITS COMMISSION', this.canvas.width / 2, 105);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('CERTIFICATE OF REGISTRATION', this.canvas.width / 2, 170);
        
        // Border
        ctx.strokeStyle = '#002664';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // ABN - AUTO GENERATED
        const abn = this.generateFakeAustraliaABN();
        ctx.fillStyle = '#002664';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`ABN: ${abn}`, this.canvas.width / 2, 230);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 290);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 330);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 80, 380);
        ctx.fillText(`City: ${orgData.city || 'Sydney'}, State: ${orgData.state || 'NSW'}`, 80, 415);
        
        // Registration Details - Use old date
        const oldDate = this.getOldDate();
        ctx.font = 'bold 18px Arial';
        ctx.fillText('ACNC Registration Details:', 80, 475);
        ctx.font = '16px Arial';
        ctx.fillText(`• Registered with ACNC on: ${this.formatDate(oldDate)}`, 100, 515);
        ctx.fillText('• Charity Type: Public Benevolent Institution', 100, 550);
        ctx.fillText('• Tax Concession: Income Tax Exempt', 100, 585);
        ctx.fillText('• Deductible Gift Recipient (DGR) Status: Endorsed', 100, 620);
        
        // Charitable Purpose
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Charitable Purpose:', 80, 675);
        ctx.font = '16px Arial';
        ctx.fillText('Advancing education, relieving poverty, and other purposes', 100, 710);
        ctx.fillText('beneficial to the general public.', 100, 740);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Authorised by:', 80, 830);
        ctx.font = '17px Arial';
        ctx.fillText('Commissioner, Australian Charities and Not-for-profits Commission', 80, 860);
        
        // Seal
        ctx.strokeStyle = '#002664';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 840, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ACNC', 700, 835);
        ctx.fillText('AUSTRALIA', 700, 852);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== KENYA CERTIFICATES ==========

    // Generate Kenya NGO Certificate
    generateKenyaNGOCertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1100;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Kenyan Flag Colors Header
        ctx.fillStyle = '#000000'; // Black
        ctx.fillRect(0, 0, this.canvas.width, 50);
        ctx.fillStyle = '#C8102E'; // Red
        ctx.fillRect(0, 50, this.canvas.width, 50);
        ctx.fillStyle = '#007A3D'; // Green
        ctx.fillRect(0, 100, this.canvas.width, 50);
        
        // White stripes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 40, this.canvas.width, 20);
        ctx.fillRect(0, 90, this.canvas.width, 20);
        
        // Coat of Arms Symbol
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚖', this.canvas.width / 2, 100);
        
        // Header
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('REPUBLIC OF KENYA', this.canvas.width / 2, 210);
        ctx.font = 'bold 26px Arial';
        ctx.fillStyle = '#8B0000';
        ctx.fillText('NGO COORDINATION BOARD', this.canvas.width / 2, 250);
        
        // Title
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('CERTIFICATE OF REGISTRATION', this.canvas.width / 2, 310);
        ctx.font = '18px Arial';
        ctx.fillText('Under the Non-Governmental Organizations Co-ordination Act', this.canvas.width / 2, 340);
        
        // Border
        ctx.strokeStyle = '#007A3D';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Registration Number - AUTO GENERATED
        const ngoNo = this.generateFakeKenyaNGONumber();
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`Registration No: ${ngoNo}`, this.canvas.width / 2, 400);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 460);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(orgData.name.toUpperCase(), 80, 500);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 80, 540);
        ctx.fillText(`Location: ${orgData.city || 'Nairobi'}, Kenya`, 80, 575);
        
        // Certificate Body - Use old date
        const oldDate = this.getOldDate();
        ctx.font = '16px Arial';
        ctx.fillText('has been duly registered as a Non-Governmental Organization under', 80, 630);
        ctx.fillText('the provisions of the Non-Governmental Organizations Co-ordination Act', 80, 660);
        ctx.fillText('and is authorized to operate in the Republic of Kenya.', 80, 690);
        ctx.fillText('', 80, 720);
        ctx.fillText(`Registration Date: ${this.formatDate(oldDate)}`, 80, 750);
        ctx.fillText('Valid Status: Active', 80, 780);
        
        // Objectives
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Authorized Activities:', 80, 840);
        ctx.font = '16px Arial';
        ctx.fillText('• Promotion of charitable and development activities', 100, 875);
        ctx.fillText('• Community empowerment and capacity building', 100, 905);
        ctx.fillText('• Social welfare and humanitarian services', 100, 935);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Authorized Signatory:', 80, 1000);
        ctx.font = '17px Arial';
        ctx.fillText('Executive Director, NGO Coordination Board', 80, 1030);
        ctx.fillText('Nairobi, Kenya', 80, 1055);
        
        // Official Seal
        ctx.strokeStyle = '#007A3D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 1020, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('NGO BOARD', 700, 1015);
        ctx.fillText('KENYA', 700, 1030);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== PAKISTAN CERTIFICATES ==========

    // Generate Pakistan SECP Certificate
    generatePakistanSECPCertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Pakistan Flag Colors Header
        ctx.fillStyle = '#01411C'; // Green
        ctx.fillRect(0, 0, this.canvas.width * 0.75, 80);
        ctx.fillStyle = '#ffffff'; // White
        ctx.fillRect(this.canvas.width * 0.75, 0, this.canvas.width * 0.25, 80);
        
        // Star and Crescent Symbol
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('☪', this.canvas.width * 0.85, 55);
        
        // Header
        ctx.fillStyle = '#01411C';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('SECURITIES & EXCHANGE COMMISSION', this.canvas.width / 2, 140);
        ctx.fillText('OF PAKISTAN', this.canvas.width / 2, 175);
        ctx.font = '18px Arial';
        ctx.fillText('اسلامی جمہوریہ پاکستان', this.canvas.width / 2, 205);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('CERTIFICATE OF INCORPORATION', this.canvas.width / 2, 260);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Section 42 Company (Not-for-Profit)', this.canvas.width / 2, 290);
        
        // Border
        ctx.strokeStyle = '#01411C';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Company Number - AUTO GENERATED
        const companyNo = this.generateFakePakistanCompanyNumber();
        ctx.fillStyle = '#01411C';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Company Number: ${companyNo}`, this.canvas.width / 2, 350);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 410);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 450);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Office: ${orgData.address}`, 80, 490);
        ctx.fillText(`City: ${orgData.city || 'Islamabad/Karachi'}, Pakistan`, 80, 525);
        
        // Certificate Body - Use old date
        const oldDate = this.getOldDate();
        ctx.font = '16px Arial';
        ctx.fillText('is incorporated under Section 42 of the Companies Act, 2017', 80, 580);
        ctx.fillText('as a company limited by guarantee without share capital,', 80, 610);
        ctx.fillText('and is registered as a Not-for-Profit organization.', 80, 640);
        ctx.fillText('', 80, 670);
        ctx.fillText(`Date of Incorporation: ${this.formatDate(oldDate)}`, 80, 700);
        
        // Objects
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Objects:', 80, 760);
        ctx.font = '16px Arial';
        ctx.fillText('• Promotion of charitable, educational, and welfare activities', 100, 795);
        ctx.fillText('• Social development and community services', 100, 825);
        ctx.fillText('• Other objects of public benefit', 100, 855);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Issued under the authority of:', 80, 910);
        ctx.font = '17px Arial';
        ctx.fillText('Registrar, Securities & Exchange Commission of Pakistan', 80, 940);
        
        // Official Seal
        ctx.strokeStyle = '#01411C';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 920, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SECP', 700, 917);
        ctx.fillText('PAKISTAN', 700, 932);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== NEPAL CERTIFICATES ==========

    // Generate Nepal SWC Certificate
    generateNepalSWCCertificate(orgData) {
        this.canvas.width = 800;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Traditional Nepali Border (double red lines)
        ctx.strokeStyle = '#DC143C';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // Nepal Flag Symbol
        ctx.fillStyle = '#DC143C';
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏔', this.canvas.width / 2, 80);
        
        // Header (Bilingual)
        ctx.fillStyle = '#000080';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('GOVERNMENT OF NEPAL', this.canvas.width / 2, 140);
        ctx.fillText('नेपाल सरकार', this.canvas.width / 2, 170);
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#8B0000';
        ctx.fillText('SOCIAL WELFARE COUNCIL', this.canvas.width / 2, 210);
        ctx.fillText('समाज कल्याण परिषद', this.canvas.width / 2, 240);
        
        // Title
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('NGO REGISTRATION CERTIFICATE', this.canvas.width / 2, 300);
        
        // Registration Number - AUTO GENERATED
        const swcNo = this.generateFakeNepalSWCNumber();
        ctx.fillStyle = '#DC143C';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`Registration No: ${swcNo}`, this.canvas.width / 2, 360);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 420);
        
        ctx.font = 'bold 20px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 460);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 80, 500);
        ctx.fillText(`District: ${orgData.city || 'Kathmandu'}, Nepal`, 80, 535);
        
        // Certificate Body - Use old date
        const oldDate = this.getOldDate();
        ctx.font = '16px Arial';
        ctx.fillText('has been registered with the Social Welfare Council as a', 80, 590);
        ctx.fillText('Non-Governmental Organization under the Association Registration Act', 80, 620);
        ctx.fillText('and Social Welfare Act, and is authorized to operate in Nepal.', 80, 650);
        ctx.fillText('', 80, 680);
        ctx.fillText(`Registration Date: ${this.formatDate(oldDate)}`, 80, 710);
        
        // Objectives
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Authorized Objectives:', 80, 770);
        ctx.font = '16px Arial';
        ctx.fillText('• Social welfare and community development', 100, 805);
        ctx.fillText('• Educational and cultural activities', 100, 835);
        ctx.fillText('• Poverty alleviation and humanitarian services', 100, 865);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Authorized by:', 80, 930);
        ctx.font = '17px Arial';
        ctx.fillText('Member Secretary, Social Welfare Council', 80, 960);
        ctx.fillText('Kathmandu, Nepal', 80, 985);
        
        // Official Seal
        ctx.strokeStyle = '#DC143C';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(650, 950, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SWC', 650, 947);
        ctx.fillText('NEPAL', 650, 962);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== NIGERIA CERTIFICATES ==========

    // Generate Nigeria CAC Certificate
    generateNigeriaCACCertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1100;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Nigerian Flag Colors
        ctx.fillStyle = '#008751'; // Green
        ctx.fillRect(0, 0, this.canvas.width / 3, 70);
        ctx.fillStyle = '#ffffff'; // White
        ctx.fillRect(this.canvas.width / 3, 0, this.canvas.width / 3, 70);
        ctx.fillStyle = '#008751'; // Green
        ctx.fillRect(this.canvas.width * 2 / 3, 0, this.canvas.width / 3, 70);
        
        // Nigerian Coat of Arms Symbol
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚖', this.canvas.width / 2, 50);
        
        // Header
        ctx.fillStyle = '#008751';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('FEDERAL REPUBLIC OF NIGERIA', this.canvas.width / 2, 130);
        ctx.font = 'bold 24px Arial';
        ctx.fillText('CORPORATE AFFAIRS COMMISSION', this.canvas.width / 2, 165);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('CERTIFICATE OF REGISTRATION', this.canvas.width / 2, 225);
        ctx.font = 'bold 22px Arial';
        ctx.fillText('Incorporated Trustees', this.canvas.width / 2, 255);
        
        // Border
        ctx.strokeStyle = '#008751';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // IT Number - AUTO GENERATED
        const itNo = this.generateFakeNigeriaITNumber();
        ctx.fillStyle = '#008751';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Registration Number: ${itNo}`, this.canvas.width / 2, 315);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 375);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 415);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 80, 455);
        ctx.fillText(`Location: ${orgData.city || 'Abuja'}, Nigeria`, 80, 490);
        
        // Certificate Body - Use old date
        const oldDate = this.getOldDate();
        ctx.font = '16px Arial';
        ctx.fillText('has been duly registered as a Body Corporate under Part C', 80, 545);
        ctx.fillText('of the Companies and Allied Matters Act (CAMA) as Incorporated Trustees,', 80, 575);
        ctx.fillText('and is authorized to operate as a non-profit organization', 80, 605);
        ctx.fillText('in the Federal Republic of Nigeria.', 80, 635);
        ctx.fillText('', 80, 665);
        ctx.fillText(`Date of Incorporation: ${this.formatDate(oldDate)}`, 80, 695);
        ctx.fillText('Status: Active', 80, 725);
        
        // Objects
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Objects:', 80, 785);
        ctx.font = '16px Arial';
        ctx.fillText('• Promotion of charitable and philanthropic activities', 100, 820);
        ctx.fillText('• Educational advancement and social welfare', 100, 850);
        ctx.fillText('• Community development and humanitarian services', 100, 880);
        ctx.fillText('• Other objects beneficial to the public', 100, 910);
        
        // Trustees
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Trustees: As registered with the Commission', 80, 960);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Issued by:', 80, 1020);
        ctx.font = '17px Arial';
        ctx.fillText('Registrar-General, Corporate Affairs Commission', 80, 1050);
        ctx.fillText('Abuja, Nigeria', 80, 1075);
        
        // Official Seal
        ctx.strokeStyle = '#008751';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 1040, 55, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CAC', 700, 1035);
        ctx.fillText('NIGERIA', 700, 1050);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }

    // ========== PHILIPPINES CERTIFICATES ==========

    // Generate Philippines SEC Certificate
    generatePhilippinesSECCertificate(orgData) {
        this.canvas.width = 850;
        this.canvas.height = 1000;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Philippine Flag Colors
        ctx.fillStyle = '#0038A8'; // Blue
        ctx.fillRect(0, 0, this.canvas.width, 50);
        ctx.fillStyle = '#CE1126'; // Red
        ctx.fillRect(0, 50, this.canvas.width, 50);
        
        // Sun and Stars Symbol
        ctx.fillStyle = '#FCD116'; // Gold
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('☀', this.canvas.width / 2, 60);
        
        // Header
        ctx.fillStyle = '#0038A8';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('REPUBLIC OF THE PHILIPPINES', this.canvas.width / 2, 145);
        ctx.font = 'bold 26px Arial';
        ctx.fillText('SECURITIES AND EXCHANGE COMMISSION', this.canvas.width / 2, 180);
        
        // Title
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 26px Arial';
        ctx.fillText('CERTIFICATE OF FILING', this.canvas.width / 2, 240);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Non-Stock, Non-Profit Corporation', this.canvas.width / 2, 270);
        
        // Border
        ctx.strokeStyle = '#0038A8';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        
        // SEC Number - AUTO GENERATED
        const secNo = this.generateFakePhilippinesSECNumber();
        ctx.fillStyle = '#0038A8';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`SEC Registration No: ${secNo}`, this.canvas.width / 2, 330);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('This is to certify that:', 80, 390);
        
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), 80, 430);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Principal Office: ${orgData.address}`, 80, 470);
        ctx.fillText(`City: ${orgData.city || 'Manila'}, Philippines`, 80, 505);
        
        // Certificate Body - Use old date
        const oldDate = this.getOldDate();
        ctx.font = '16px Arial';
        ctx.fillText('has filed its Articles of Incorporation and By-Laws with the', 80, 560);
        ctx.fillText('Securities and Exchange Commission and is hereby registered', 80, 590);
        ctx.fillText('as a Non-Stock, Non-Profit Corporation under the provisions', 80, 620);
        ctx.fillText('of the Corporation Code of the Philippines.', 80, 650);
        ctx.fillText('', 80, 680);
        ctx.fillText(`Date of Registration: ${this.formatDate(oldDate)}`, 80, 710);
        ctx.fillText('Term of Existence: Perpetual', 80, 740);
        
        // Purpose
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Primary Purpose:', 80, 800);
        ctx.font = '16px Arial';
        ctx.fillText('• Promotion of charitable, educational, and social welfare activities', 100, 835);
        ctx.fillText('• Community development and humanitarian services', 100, 865);
        ctx.fillText('• Other lawful purposes not for profit', 100, 895);
        
        // Signature
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Given under my hand and the seal of the Commission:', 80, 935);
        ctx.font = '17px Arial';
        ctx.fillText('Director, Corporation Finance Department', 80, 965);
        
        // Official Seal
        ctx.strokeStyle = '#0038A8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(700, 945, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SEC', 700, 942);
        ctx.fillText('PHILIPPINES', 700, 957);
        
        return this.canvas.toDataURL('image/jpeg', 0.95);
    }
}

// Initialize the generator
const nonprofitGenerator = new NonprofitCertificateGenerator();
