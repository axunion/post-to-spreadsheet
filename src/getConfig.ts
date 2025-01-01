type Config = {
	dueDate: Date;
	sheetId: string;
	sheetName: string;
	rows: ConfigRow[];
};

type ConfigRow = {
	name: string;
	maxlength: number;
	required: boolean;
};

function _getConfig(): void {
	const properties = PropertiesService.getScriptProperties().getProperties();
	const config = getConfig(properties.SPREADSHEET_ID_CONFIG, "");
	console.log(config);
}

function getConfig(sheetId: string, sheetName: string): Config {
	const ss = SpreadsheetApp.openById(sheetId);
	const sheet = ss.getSheetByName(sheetName);

	if (!sheet) {
		throw new Error("Config not found.");
	}

	const data = sheet.getDataRange().getValues();

	return {
		dueDate: data[0][0],
		sheetId: data[1][0].trim(),
		sheetName: data[2][0].trim(),
		rows: data.slice(4).map((row) => ({
			name: row[0].trim(),
			maxlength: Number.parseInt(row[1]) || 0,
			required: Boolean(row[2]),
		})),
	};
}
