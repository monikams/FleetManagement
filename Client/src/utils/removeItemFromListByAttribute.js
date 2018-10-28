import displayProblem from './displayProblem.js'
import isNil from 'lodash/isNil'
import Immutable from 'immutable';
 
const removeItemFromListByAttribute = (data, attribute, attributeName = "Id") => {
	const alertMessage = "There is a problem with the removal of the selected item!";
	let logMessage = "";
	
	if (isNil(data)) {
		logMessage = "The list that contains an item for removal is null!";
	} else if (data.size === 0) {
		logMessage = "The list that contains an item for removal is empty!";
	} else if (isNil(attribute)) {
		logMessage = `The item's ${attributeName} is invalid!`;
	} else {
		const index = data.findIndex(e => e.get(attributeName).toLocaleLowerCase() === attribute.toLocaleLowerCase());
	
		if (index === -1) {
			logMessage = `There is no item with the ${attributeName} = ${attribute} that must be removed!`;
		} else {
			const itemToRemove = data.getIn([index]);
			const edittedData = data.deleteIn([index]);

			return {edittedData, itemToRemove};
		}
	}

	if (!isNil(logMessage)) {
		displayProblem(alertMessage, logMessage);
		return Immutable.List();
	}
}

export default removeItemFromListByAttribute;