export class KhmerDate {
  private readonly date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  getDate(): Date {
    return this.date;
  }

  getRelativeTime(): string {
    const now = new Date();
    const msAgo = now.getTime() - this.date.getTime();

    if (msAgo < 1000) {
      return "just now";
    } else if (msAgo < 60 * 1000) {
      return `${Math.floor(msAgo / 1000)} seconds ago`;
    } else if (msAgo < 60 * 60 * 1000) {
      return `${Math.floor(msAgo / (60 * 1000))} minutes ago`;
    } else if (msAgo < 24 * 60 * 60 * 1000) {
      return `${Math.floor(msAgo / (60 * 60 * 1000))} hours ago`;
    } else if (msAgo < 7 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(msAgo / (24 * 60 * 60 * 1000))} days ago`;
    } else if (msAgo < 30 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(msAgo / (7 * 24 * 60 * 60 * 1000))} weeks ago`;
    } else if (msAgo < 365 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(msAgo / (30 * 24 * 60 * 60 * 1000))} months ago`;
    } else {
      return `${Math.floor(msAgo / (365 * 24 * 60 * 60 * 1000))} years ago`;
    }
  }
}
