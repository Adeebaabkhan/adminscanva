// Simple Faker.js replacement for the document generator
// This provides essential fake data generation without external dependencies

const faker = {
    person: {
        fullName() {
            const firstNames = [
                'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
                'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
                'Charles', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra',
                'Donald', 'Donna', 'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
                'Kenneth', 'Emily', 'Kevin', 'Kimberly', 'Brian', 'Deborah', 'George', 'Dorothy', 'Edward', 'Amy'
            ];
            
            const lastNames = [
                'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
                'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
                'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
                'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
            ];
            
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            return `${firstName} ${lastName}`;
        }
    },
    
    internet: {
        email() {
            const domains = ['school.edu', 'academy.org', 'institute.edu', 'education.net', 'campus.edu'];
            const name = faker.person.fullName().toLowerCase().replace(' ', '.');
            const domain = domains[Math.floor(Math.random() * domains.length)];
            return `${name}@${domain}`;
        }
    },
    
    phone: {
        number() {
            const formats = [
                '+1-###-###-####',
                '(###) ###-####',
                '###-###-####',
                '+91-####-######',
                '+44-####-######'
            ];
            const format = formats[Math.floor(Math.random() * formats.length)];
            return format.replace(/#/g, () => Math.floor(Math.random() * 10));
        }
    },
    
    location: {
        city() {
            const cities = [
                'Springfield', 'Franklin', 'Georgetown', 'Madison', 'Washington', 'Arlington', 'Centerville', 'Fairview',
                'Riverside', 'Oakland', 'Greenwood', 'Salem', 'Bristol', 'Fairfield', 'Kingston', 'Marion', 'Oxford',
                'Clayton', 'Hudson', 'Ashland', 'Dover', 'Jackson', 'Auburn', 'Troy', 'Newton', 'Dayton', 'Lexington',
                'Milford', 'Burlington', 'Quincy', 'Wayne', 'Lincoln', 'Lancaster', 'Preston', 'Concord', 'Monroe'
            ];
            return cities[Math.floor(Math.random() * cities.length)];
        }
    },
    
    company: {
        name() {
            const prefixes = ['Global', 'United', 'International', 'Advanced', 'Modern', 'Elite', 'Premier', 'Superior'];
            const suffixes = ['Academy', 'Institute', 'School', 'College', 'University', 'Learning Center', 'Education Center'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            return `${prefix} ${suffix}`;
        }
    },
    
    // For backward compatibility
    setLocale(locale) {
        // No-op for now, but maintains API compatibility
    }
};

// Simple QR Code replacement - generates a placeholder
const QRCode = {
    toDataURL(text, options = {}) {
        return new Promise((resolve) => {
            // Create a simple placeholder QR code
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = options.width || 100;
            
            canvas.width = size;
            canvas.height = size;
            
            // Simple checkerboard pattern as QR code placeholder
            ctx.fillStyle = '#000000';
            const squareSize = size / 10;
            
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    if ((row + col) % 2 === 0) {
                        ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
                    }
                }
            }
            
            // Add "QR" text in center
            ctx.fillStyle = '#ffffff';
            ctx.font = `${size/8}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('QR', size/2, size/2 + size/16);
            
            resolve(canvas.toDataURL());
        });
    }
};

console.log('Local Faker.js and QRCode replacements loaded successfully');