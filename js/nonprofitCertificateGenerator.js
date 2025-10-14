// Nonprofit Certificate Generator - Complete Implementation
class NonprofitCertificateGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    // Helper method to format dates
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
        
        // Registration Number
        const regNo = `AAATX${Math.floor(Math.random() * 9000) + 1000}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
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
        
        ctx.fillStyle = '#000000';
        ctx.font = '18px Arial';
        ctx.fillText(`Registered Address: ${orgData.address}`, 150, 570);
        ctx.fillText(`PAN: ${orgData.pan}`, 150, 600);
        ctx.fillText(`Registration Date: ${this.formatDate(new Date())}`, 150, 630);
        
        // Certificate Body
        ctx.font = '16px Arial';
        ctx.fillText('has been registered under Section 12A of the Income Tax Act, 1961', 100, 690);
        ctx.fillText('for the purposes of claiming exemption under Section 11 and 12.', 100, 720);
        ctx.fillText('This registration is valid from Financial Year 2024-25 onwards', 100, 750);
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
        
        // Registration Number
        const regNo = `80G/${Math.floor(Math.random() * 9000) + 1000}/${new Date().getFullYear()}`;
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
        
        ctx.fillStyle = '#000000';
        ctx.font = '17px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 150, 510);
        ctx.fillText(`PAN: ${orgData.pan}`, 150, 540);
        
        // Exemption Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Tax Exemption Details:', 100, 600);
        ctx.font = '16px Arial';
        ctx.fillText('• Donations are eligible for 50% deduction under Section 80G', 120, 635);
        ctx.fillText('• Valid for contributions made from AY 2024-25 onwards', 120, 665);
        ctx.fillText('• Subject to provisions of Income Tax Act, 1961', 120, 695);
        
        // Validity
        const issueDate = new Date();
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
        
        // NGO Darpan ID
        const darpanId = `${orgData.state || 'MH'}/2024/${Math.floor(Math.random() * 900000) + 100000}`;
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(`ID: ${darpanId}`, this.canvas.width / 2, 160);
        
        // Organization Details
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(orgData.name.toUpperCase(), this.canvas.width / 2, 220);
        
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Registration No: ${orgData.registrationNo || 'N/A'}`, 100, 280);
        ctx.fillText(`Type: ${orgData.type || 'Trust/Society/Section 8 Company'}`, 100, 315);
        ctx.fillText(`State: ${orgData.state || 'Maharashtra'}`, 100, 350);
        ctx.fillText(`City: ${orgData.city || 'Mumbai'}`, 100, 385);
        
        // Registration Date
        ctx.fillText(`Registered on NGO Darpan: ${this.formatDate(new Date())}`, 100, 430);
        
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
        
        // Registration Number
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
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address: ${orgData.address}`, 100, 450);
        ctx.fillText(`PAN: ${orgData.pan}`, 100, 485);
        
        // FCRA Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('FCRA Registration Details:', 100, 540);
        ctx.font = '16px Arial';
        ctx.fillText('• Authorized to receive foreign contributions', 120, 575);
        ctx.fillText('• Must maintain separate FCRA bank account', 120, 605);
        ctx.fillText('• Annual returns mandatory', 120, 635);
        ctx.fillText('• Valid for receipt of foreign funds', 120, 665);
        
        // Validity
        const issueDate = new Date();
        const validUntil = new Date(issueDate.getFullYear() + 5, issueDate.getMonth(), issueDate.getDate());
        ctx.fillText(`Registration Date: ${this.formatDate(issueDate)}`, 100, 720);
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
        
        // Registration Details
        const regNo = `${orgData.state || 'MH'}/TRUST/${Math.floor(Math.random() * 9000) + 1000}/2024`;
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
            'THIS DEED OF TRUST is made on this day of ' + this.formatDate(new Date()),
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
        
        // PAN Number
        const panNo = orgData.pan || `AAATX${Math.floor(Math.random() * 9000) + 1000}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
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
        
        // Date of Registration
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Date of Issue:', 30, 330);
        ctx.font = '13px Arial';
        ctx.fillText(this.formatDate(new Date()), 30, 355);
        
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
        
        // EIN
        const ein = orgData.ein || `${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000000) + 1000000}`;
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
        
        // Effective Date
        yPos += 30;
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`Effective Date: ${this.formatDate(new Date())}`, 80, yPos);
        
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
        
        // Registration Number
        const charityNo = Math.floor(Math.random() * 900000) + 100000;
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
        
        // Registration Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Registration Details:', 80, 470);
        ctx.font = '16px Arial';
        ctx.fillText(`• Registered as a Charitable Incorporated Organisation (CIO)`, 100, 510);
        ctx.fillText(`• Registration Date: ${this.formatDate(new Date())}`, 100, 545);
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
        ctx.fillText('ENREGISTREMENT COMME ORGANISME DE BIENFAISANCE', this.canvas.width / 2, 260);
        
        // Registration Number
        const bnNo = `${Math.floor(Math.random() * 900000000) + 100000000} RR 0001`;
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Registration Number / Numéro d'enregistrement: ${bnNo}`, this.canvas.width / 2, 320);
        
        // Organization Details
        ctx.textAlign = 'left';
        ctx.font = '18px Arial';
        ctx.fillText('Organization Name / Nom de l\'organisation:', 80, 380);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(orgData.name, 80, 410);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Address / Adresse: ${orgData.address}`, 80, 450);
        ctx.fillText(`City / Ville: ${orgData.city || 'Toronto'}, Province: ${orgData.province || 'ON'}`, 80, 485);
        
        // Registration Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Registration Status / Statut d\'enregistrement:', 80, 540);
        ctx.font = '16px Arial';
        ctx.fillText('• Registered Charity / Organisme de bienfaisance enregistré', 100, 575);
        ctx.fillText(`• Effective Date / Date d'entrée en vigueur: ${this.formatDate(new Date())}`, 100, 610);
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
        
        // ABN
        const abn = `${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`;
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
        
        // Registration Details
        ctx.font = 'bold 18px Arial';
        ctx.fillText('ACNC Registration Details:', 80, 475);
        ctx.font = '16px Arial';
        ctx.fillText(`• Registered with ACNC on: ${this.formatDate(new Date())}`, 100, 515);
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
}

// Initialize the generator
const nonprofitGenerator = new NonprofitCertificateGenerator();
