import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { randomBytes } from 'node:crypto';

/**
 * Random test data generator.
 *
 * Provides reusable helpers for random numbers, array selection, dates, strings,
 * names, and other values used to make test payloads unique.
 */
export class Generate {

    /**
     * Generates a pseudorandom number between 0 and 1.
     * @returns A pseudorandom number between 0 (inclusive) and 1 (exclusive).
     */
    getRandomNumber(): number {
        const buffer = randomBytes(4); // Generate 4 random bytes
        const randomValue = buffer.readUInt32BE(0) / 0xFFFFFFFF; // Convert to a number between 0 and 1
        return randomValue;
    }

    /**
     * Get item in an array randomly
     * @param array
     * @returns
     */
    genItemInArray(array: any[]): any {
        return array.length ? array[this.genNumber(0, array.length - 1)] : '';
    }

    /**
     * Get a list of items from an array
     * @param array
     * @param count
     * @returns
     */
    genSubItemsFromArray(array: string[], count: number): string[] {
        const result: string[] = [];
        let restOfItems = array;
        for (let i = 0; i < count; i++) {
            const item = this.genItemInArray(restOfItems);
            result.push(item);
            restOfItems = restOfItems.filter(val => val != item);
        }
        return result;
    }

    /**
     * Random Number with length
     * @param length
     */
    genRandom(length: number = 2): number {
        return Math.floor(Math.pow(10, length - 1) + this.getRandomNumber() * 9 * Math.pow(10, length - 1));
    }

    /**
     * Generate Recent Recent Date
     * @param options
     * @returns
     */
    genRecentDate(options: any, delimiter: string = '/'): string {
        return `${this.genDate(faker.date.recent(options), delimiter)}`;
    }

    /**
     * Generate Future Recent Date
     * @param options
     * @returns
     */
    genFutureDate(options: any = {}, delimiter: string = '/'): string {
        const date = faker.date.future(options);
        const formattedDate = date.toLocaleDateString('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').join(delimiter);

        return `${formattedDate}`;
    }

    /**
    * Generate current date
    * @param date
    * @returns
    */
    genDate(date = new Date(), delimiter: string = '/'): string {
        const formattedDate = date.toLocaleDateString('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').join(delimiter);

        return formattedDate;
    }

    /**
    * Generate recent date
    * @param option how many date
    * @returns MM/DD/YYYY HH:MM:SS
    */
    genRecentDateAndTime(options: any, delimiter: string = '/'): string {
        const date = faker.date.recent(options);

        const formattedDate = date.toLocaleDateString('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').join(delimiter);

        const formattedTime = date.toLocaleTimeString('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        return `${formattedDate} ${formattedTime}`;
    }

    /**
    * Generate future date
    * @param option how many date
    * @returns MM/DD/YYYY HH:MM:SS
    */
    genFutureDateAndTime(options: any, delimiter: string = '/'): string {
        const date = faker.date.future(options);
        const formattedDate = date.toLocaleDateString('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').join(delimiter);

        const formattedTime = date.toLocaleTimeString('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        return `${formattedDate} ${formattedTime}`;
    }

    /**
     * Generate Random Date
     * @param gapYear Negative number for a future date
     * @returns
     */
    generateRandomDate(gapYear: number = 1): string {
        const today = new Date();
        const startDate = new Date(today.getFullYear() - gapYear, today.getMonth(), today.getDate());
        const randomDate = new Date(startDate.getTime() + this.getRandomNumber() * (today.getTime() - startDate.getTime()));
        // Format the date as MM/dd/yyyy
        return format(randomDate, 'MM/dd/yyyy');
    }

    /**
     * Generate Random Date Before Today In This Month
     * @returns
     */
    generateRandomDateBeforeTodayInThisMonth(): string {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), this.genNumber(1, today.getDate()));
        const randomDate = new Date(startDate.getTime() + this.getRandomNumber() * (today.getTime() - startDate.getTime()));
        // Format the date as MM/dd/yyyy
        return format(randomDate, 'MM/dd/yyyy');
    }

    /**
     * Generate a random year in the past or future
     * @return
     */
    generateRandomYear(direction: 'past' | 'future'): number {
        const now = new Date();
        const year = now.getFullYear();
        if (direction === 'past') {
            return faker.number.int({ min: 2000, max: year });
        } else {
            return faker.number.int({ min: year, max: 2100 });
        }
    }

    /**
    * Gen current date
    * @returns
    */
    genYYMM(): string {
        const date = faker.date.future();
        const formattedDate = date.toLocaleDateString('default', {
            year: '2-digit',
            month: '2-digit',
        }).replace('/', '');

        return formattedDate;
    }

    /**
     * Generate date
     * @param start
     * @param end
     * @returns DD/MM/YYYY
     */
    randomDate(start: string, end: string): string {
        const date = faker.date.between({
            from: start,
            to: end,
        });

        const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
        const day = String(date.getDate()).padStart(2, '0');        // DD
        const year = date.getFullYear();                            // YYYY

        return `${day}/${month}/${year}`; // DD/MM//YYYY
    }

    /**
    * Generate current Time
    * @returns
    */
    genTime(): string {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).replace(/:/g, '');

        return formattedTime;
    }

    /**
     * Generate an array, Result examples: [[0, 100], [100, -1]]
     * @param length
     */
    generateArray(length: number): Array<[number, number]> {
        let min = 0;
        let max = Math.round(length / 5);
        const step = max;
        const arr: Array<[number, number]> = [];
        let item: [number, number] = [min, max];
        arr.push(item);

        while (length > 0 && min < length && max !== -1) {
            min = min + step;
            max = min + step;
            if (max >= length) {
                min = length - step;
                max = -1;
            }

            item = [min, max];
            arr.push(item);
        }

        return arr;
    }

    /**
     * Generate number
     * @param min
     * @param max
     */
    genNumber(min: number = 1, max: number = 1000): number {
        return Math.floor(this.getRandomNumber() * (max - min) + min);
    }

    /**
     * Random boolean true | false
     * @returns
     */
    genBoolean(): boolean {
        return Math.floor(this.getRandomNumber() * 100) % 2 === 1;
    }

    /**
     * Generate Email
     * @returns
     */
    genEmail(): string {
        return `${faker.internet.username()}@kyanon.digital`;
    }

    /**
     * Generate Merchant ID
     * @returns
     */
    genMID(): string {
        return `MID-${this.genNumber(1000, 9999999)}`;
    }

    /**
     * Generate an Entity ID
     * @returns
     */
    generateRandomEntityID(): string {
        return `${this.generateAlphaNumericString(8)}-${this.generateAlphaNumericString(4)}-${this.generateAlphaNumericString(4)}-${this.generateAlphaNumericString(4)}-${this.generateAlphaNumericString(12)}`;
    }

    /**
     * Generate TimeStamp
     * toISOString() returns the date in the format YYYY-MM-DDTHH:mm:ss.sssZ.
     * replace(/[-:.TZ]/g, '') removes the characters -, ., :, T, and Z.
     * slice(0, 17) ensures that the string includes only up to the milliseconds (3 digits).
     * @returns Ex: 20240822013456838
     */
    generateTimeStamp(): string {
        return (new Date()).toISOString().replace(/[-:.TZ]/g, '').slice(0, 17);
    }

    /**
     * Generates a random string of length with special characters
     * @param length
     * @returns: * ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~
     */
    generateSpecialCharacters(length: number = 20): string {
        return faker.string.symbol(length);
    }

    /**
     * Generate a random inquiry name
     * @returns
     */
    generateRandomInquiryName(): string {
        return `Inquiry about ${faker.commerce.productName()}`;
    }

    /**
     * Generate a random paragraph
     * @param length
     * @returns
     */
    generateRandomParagraph(length: number = 1): string {
        return faker.lorem.paragraph(length);
    }

    /**
     * Generate a random string
     * @param length
     * @returns
     */
    generateRandomString(length: number = 10): string {
        return faker.lorem.words(length);
    }

    /**
     * Generate a random full name
     * @returns
     */
    generateRandomFullName(): string {
        return faker.person.fullName();
    }

    /**
     * Generate a random model
     * @returns
     */
    generateRandomModel(): string {
        return faker.vehicle.model();
    }

    /**
     * Generate a random location
     * @returns
     */
    generateRandomLocation(): string {
        return faker.location.city();
    }

    /**
     * Generate a random company name
     * @returns
     */
    generateRandomCompany(): string {
        return faker.company.name();
    }

    /**
     * Generate a random brand
     * @returns
     */
    generateRandomBrand(): string {
        return faker.vehicle.manufacturer();
    }

    /**
     * Generate a random color
     * @returns
     */
    generateRandomColor(): string {
        return faker.color.human();
    }

    /**
     * Generate a random float number
     * @returns
     */
    generateRandomFloat(min?: number, max?: number, precision?: number): number {
        return faker.number.float({ min: min, max: max, fractionDigits: precision });
    }

    /**
     * Generate a MMSI
     * @returns
     */
    generateMMSI(): string {
        const mids = [
            '235',
            '366',
            '248',
            '563',
            '310',
            '257',
            '370'
        ];
        const mid = this.genItemInArray(mids);
        const rest = this.genNumber(100000, 999999);
        return `${mid}${rest}`;
    }

    /**
     * Generate a container type
     * @returns
     */
    generateContainerType(): string {
        const types = [
            '20GP',
            '40GP',
            '40HC',
            '45HC',
            '20RF',
            '40RF',
            '20OT',
            '40OT',
            '20FR',
            '40FR',
            'ISO Tank'
        ];
        return this.genItemInArray(types);
    }

    /**
     * Generate a random division
     * @returns
     */
    generateDivision(): string {
        const divisions = [
            'Marketing',
            'Sales',
            'Engineering',
            'Research & Development',
            'Finance',
            'Human Resources',
            'IT',
            'Legal',
            'Operations'
        ];
        return this.genItemInArray(divisions);
    }

    /**
     * Generate a random community
     * @returns
     */
    generateCommunity(): string {
        const communities = [
            'Residence',
            'Villas',
            'Apartments',
            'Industries',
            'Ports',];
        return this.genItemInArray(communities);
    }

    /**
     * Generate a US state name
     * @returns
     */
    generateRandomState(): string {
        return faker.location.state();
    }

    /**
     * Generate an alphanumeric string
     * @returns
     */
    generateAlphaNumericString(length: number): string {
        return faker.string.alphanumeric({ length: length });
    }

    /**
     * Generate a US state name
     * @returns
     */
    generateRandomAddress(): string {
        return faker.location.streetAddress();
    }

    /**
     * Generate a random latitude
     * @returns
     */
    generateRandomLatitude(): number {
        return faker.location.latitude();
    }

    /**
     * Generate a random longitude
     * @returns
     */
    generateRandomLongitude(): number {
        return faker.location.longitude();
    }

    /**
    * Generate a random phone number
    * @returns
    */
    generateRandomPhone(): string {
        return faker.phone.number({ style: 'international' });
    }

    /**
     * Generate a random RUC
     * @returns
     */
    generateRUC(): string {
        const prefix = faker.helpers.arrayElement(['10', '15', '17', '20']);
        const digits = faker.number.int({ min: 100000000, max: 999999999 });
        return `${prefix}${digits}`;
    }

    /**
     * Generate a RFID
     * @returns
     */
    generateRFID(): string {
        return faker.string.hexadecimal({ length: 16, casing: 'upper', prefix: 'RFID-' });
    }

    /**
     * Generate a job title
     * @returns
     */
    generateJobTitle(): string {
        return faker.person.jobTitle();
    }

    /**
     * Generate a job type
     * @returns
     */
    generateJobType(): string {
        return faker.person.jobType();
    }

    /**
     * Generate an amount of money
     * @param min
     * @param max
     * @returns
     */
    generateRandomAssets(min: number, max: number): number {
        return parseFloat(faker.finance.amount({ min: min, max: max }));
    }

    /**
     * Generate a vehicle information
     * @returns
     */
    generateVehicleInfo(): any {
        const vehicle = faker.vehicle.vehicle();
        const brand = vehicle.split(' ')[0];
        const model = vehicle.split(' ')[1];
        const type = faker.vehicle.type();
        const info = {
            vehicle: vehicle,
            brand: brand,
            model: model,
            type: type,
            color: faker.vehicle.color(),
            chassis: faker.vehicle.vin(),
            license: faker.vehicle.vrm(),
            capacity: this.genNumber(4, 50),
            soat: faker.string.alphanumeric({ length: 14, casing: 'upper' })
        };
        return info;
    }

    /**
     * Generate a random ethnicity
     * @return
     */
    generateRandomEthinicity(): string {
        const ethnicities = [
            'White',
            'Asian',
            'Black or African American',
            'American Indian or Alaska Native',
            'Hispanic or Latino',
            'Native Hawaiian or Other Pacific Islander',
            'Middle Eastern or North African',
            'Other'
        ];
        return this.genItemInArray(ethnicities);
    }

    /**
     * Generate a random marital status
     * @return
     */
    generateRandomMaritalStatus(): string {
        const status = [
            'Single',
            'Married',
            'Divorce',
            'Widowed',
            'Separated'
        ];
        return this.genItemInArray(status);
    }

    /**
     * Generate a random education
     * @return
     */
    generateRandomEducation(): string {
        const education = [
            'High School',
            'Bachelor',
            'Master',
            'Doctorate',
            'College',
            'Vocational Training',
            'No Formal Education'
        ];
        return this.genItemInArray(education);
    }

    /**
     * Generate First Name
     * @returns
     */
    genFirstName(): string {
        return faker.person.firstName();
    }

    /**
     * Generate Last Name
     * @returns
     */
    genLastName(): string {
        return faker.person.lastName();
    }

    /**
     * Generate User Name
     * @returns
     */
    genUserName(): string {
        return faker.internet.username();
    }

    /**
     * Generate a date in the format DD-MM-YYYY HH:mm
     * @param d
     * @returns
     */
    formatDDMMYYYYHHmm(d: Date): string {
        const pad = (n: number): string => String(n).padStart(2, '0');
        return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
}
