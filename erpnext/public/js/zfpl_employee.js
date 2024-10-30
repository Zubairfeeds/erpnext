frappe.ui.form.on('Employee', {
    date_of_joining: function (frm) {
        calculateEndDate(frm);
    },
    tenure: function (frm) {
        calculateEndDate(frm);
    }
});

function calculateEndDate(frm) {
    var dateOfJoining = frm.doc.date_of_joining;
    var tenure = frm.doc.tenure;

    if (dateOfJoining && tenure) {
        var tenureInDays = tenure * 30; // Assuming 30 days per month

        // Calculate expected_end_date by adding date_of_joining and tenure in days
        var endDate = new Date(dateOfJoining);
        endDate.setDate(endDate.getDate() + tenureInDays);

        // Set the expected_end_date field value
        frm.set_value('expected_end_date', endDate);
    }
}



frappe.ui.form.on('Employee', {
    date_of_birth: function (frm) {
        calculateDateOfRetirement(frm);
    },
    employment_type: function (frm) {
        calculateDateOfRetirement(frm);
        console.log("ttttee")
    },
});

function calculateDateOfRetirement(frm) {
    var dateOfBirth = frm.doc.date_of_birth;
    var employmentType = frm.doc.employment_type;

    // Define the list of employment types where retirement date needs to be calculated
    var eligibleEmploymentTypes = ['Full-time', 'Probation'];

    if (eligibleEmploymentTypes.includes(employmentType)) {
        if (dateOfBirth) {
            // Define retirement age limit
            var retirementAgeLimit = 60;

            // Convert date of birth string to Date object
            var dob = new Date(dateOfBirth);

            // Calculate retirement date based on date of birth
            var retirementDate = new Date(dob.getTime());
            retirementDate.setFullYear(retirementDate.getFullYear() + retirementAgeLimit);

            // Set the date_of_retirement field value
            frm.set_value('date_of_retirement', retirementDate);
            console.log("retirementDate")
        }
    } else {
        // If employment type is not in eligible list, clear retirement date field
        frm.set_value('date_of_retirement', null);
    }
}

// Function to calculate retirement date for imported records
// frappe.after_import('Employee', function(data) {
//     data.forEach(function(row) {
//         // Assuming 'date_of_birth' and 'employment_type' are provided in the imported data
//         var dateOfBirth = row.date_of_birth;
//         var employmentType = row.employment_type;

//         // Define the list of employment types where retirement date needs to be calculated
//         var eligibleEmploymentTypes = ['Full-time', 'Probation'];

//         if (eligibleEmploymentTypes.includes(employmentType)) {
//             if (dateOfBirth) {
//                 // Define retirement age limit
//                 var retirementAgeLimit = 60;

//                 // Convert date of birth string to Date object
//                 var dob = new Date(dateOfBirth);

//                 // Calculate retirement date based on date of birth
//                 var retirementDate = new Date(dob.getTime());
//                 retirementDate.setFullYear(retirementDate.getFullYear() + retirementAgeLimit);

//                 // Set the retirement date in the imported data
//                 row.date_of_retirement = retirementDate;
//             }
//         } else {
//             // If employment type is not in eligible list, set retirement date to null
//             row.date_of_retirement = null;
//         }
//     });
// });
