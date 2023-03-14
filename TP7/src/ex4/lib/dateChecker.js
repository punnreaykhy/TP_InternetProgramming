import { convertToKhmerNumber } from "./khmerNumConverter.js";
class KhmerDate {
    constructor(date) {
        this.date = date;
    }
    getDate() {
        return this.date;
    }
    getRelativeTime() {
        const now = new Date();
        const msAgo = now.getTime() - this.date.getTime();
        if (msAgo < 60 * 1000) {
            return `មុននេះបន្តិច`;
        }
        else if (msAgo < 60 * 60 * 1000) {
            return `${convertToKhmerNumber(Math.floor(msAgo / (60 * 1000)))} នាទីមុន`;
        }
        else if (msAgo < 24 * 60 * 60 * 1000) {
            return `${convertToKhmerNumber(Math.floor(msAgo / (60 * 60 * 1000)))} ម៉ោងមុន`;
        }
        else if (msAgo < 7 * 24 * 60 * 60 * 1000) {
            return `${convertToKhmerNumber(Math.floor(msAgo / (24 * 60 * 60 * 1000)))} ថ្ងៃមុន`;
        }
        else if (msAgo < 30 * 24 * 60 * 60 * 1000) {
            return `${convertToKhmerNumber(Math.floor(msAgo / (7 * 24 * 60 * 60 * 1000)))} សប្តាហ៍មុន`;
        }
        else if (msAgo < 365 * 24 * 60 * 60 * 1000) {
            return `${convertToKhmerNumber(Math.floor(msAgo / (30 * 24 * 60 * 60 * 1000)))} ខែមុន`;
        }
        else {
            return `${convertToKhmerNumber(Math.floor(msAgo / (365 * 24 * 60 * 60 * 1000)))} ឆ្នាំមុន`;
        }
    }
}
export { KhmerDate };
