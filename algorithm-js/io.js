//PDF AND CSV DOWNLOADING

function downloadCSV() {
    var objArray = generated;
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    var blob = new Blob([str], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("id", "dl-link");
            link.setAttribute("download", "Chores-CSV.csv");
            link.style.visibility = 'hidden';

            $("#admin").append(link);
            link.click();
            $("#dl-link").remove();
            /*
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);*/
        }
    }
}


function downloadPDF(){
    var doc = new jsPDF('l', 'pt');
    var elem = document.getElementById("month-schedule");
    
    doc.autoTableSetDefaults({
        headerStyles: {fillColor: [178,34,34]}, // Red
        margin: {top: 60},
        addPageContent: function(data) {
            doc.setFontSize(20);
            doc.text($("#month-title").text(), 40, 50);
        }
    });
    
    var res = doc.autoTableHtmlToJson(elem);
    var columns = ["Date", "Kitchen", "", "Trash", "","Vacuum", ""];
    console.log(res);
    doc.autoTable(columns, res.data);
    doc.save("month.pdf");
}