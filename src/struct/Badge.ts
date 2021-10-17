/**
 * Represents a Badge
 */
export class Badge {
	public url: string;
	public large: string;
	public medium: string;
	public small: string;

	public constructor(data: any) {
		/**
		 * The default icon URL
		 * @type {string}
		 */
		this.url = data.large;

		/**
		 * The large icon URL
		 * @type {string}
		 */
		this.large = data.large;

		/**
		 * The medium icon URL
		 * @type {string}
		 */
		this.medium = data.medium;

		/**
		 * The small icon URL
		 * @type {string}
		 */
		this.small = data.small;
	}
}
