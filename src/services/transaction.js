// This functin finds and groups all the duplicate transactions which have the time difference of one mintue,
// Add the return value will be arrays of the rows within the given array, which have been sorted by the time.

module.exports.findDuplicateTransactions = (transactions = []) => {
    // check if transactions were sent
    if (transactions && Array.isArray(transactions) && transactions.length > 0) {
        // group and Sort all Tranactions
        const groupAndSort = (array, groupField) => {
            let grouped = [];
            let finalResult = [];

            // Push all the rows into grouped
            for (var i = 0; i < array.length; i++) {
                var row = array[i];
                var groupValue = row[groupField];
                grouped[groupValue] = grouped[groupValue] || [];
                grouped[groupValue].push(row);
            }

            // Sort each group
            for (let groupValue in grouped) {
                grouped[groupValue] = grouped[groupValue].sort(sortByDate);
                let arr = grouped[groupValue];

                // Get the first two publicates
                let i;
                for (i = 1; i < arr.length; i++) {
                    const prevTime = new Date(arr[i - 1].time).getTime();
                    const curTime = new Date(arr[i].time).getTime();
                    if (curTime - prevTime <= 60000) break;
                }

                if (i === arr.length) return [];
                const result = [arr[i - 1], arr[i]];

                // Find other duplicates
                i++;
                while (i < arr.length) {
                    const prevTime = new Date(arr[i - 1].time).getTime();
                    const curTime = new Date(arr[i].time).getTime();
                    if (curTime - prevTime > 60000) break;
                    result.push(arr[i]);
                    i++;
                }

                // push result
                finalResult.push(result);
            }

            // Return the results
            return finalResult;
        };

        // Sort by date
        const sortByDate = (a, b) => {
            var dateA = new Date(a.time).getTime();
            var dateB = new Date(b.time).getTime();
            return dateA > dateB ? 1 : -1;
        };

        const groupedAndSorted = groupAndSort(transactions, 'category');

        return groupedAndSorted;
    }
};
