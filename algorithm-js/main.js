var generated;
/*
UPLOAD!
$.ajax({
    url: _saveAllDevicesUrl
,   type: 'POST'
,   contentType: 'application/json'
,   data: JSON.stringify(postData) //stringify is important
,   success: _madeSave.bind(this)
});
*/

function generate(days) {
    //var array = document.getElementById('name_input').value.split(/[ ]*,[ ]*/);
    //MANIFACTURE OFFSET
    //6 groups of 5
    //var array =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56];
    var array = ["Wilford", "Sammy", "Isreal", "Donny", "Clarence", "Ben", "Reuben", "Kenneth", "Stewart", "Dante", "Gayle", "Benton", "Bret", "Bob", "Brant", "Sergio", "Robert", "Calvin", "Emile", "Jamar", "Henry", "Mohammed", "Oren", "Thaddeus", "Harold", "Jim", "Joan", "Victor", "Hipolito", "Yong", "Eduardo", "Carmelo", "German", "Ernesto", "Augustus", "Tyson", "Denny", "Darnell", "Francisco", "Alfred", "Maynard", "Elisha", "Sang", "Chester", "Cedrick", "Michal", "Robt", "Filiberto", "Damian", "Pedro", "Jerald", "Lyndon", "Harris", "Glenn", "Clint", "Lyle", "Michael", "Barrett", "Modesto", "Leonel"];
    array = shuffle(array);
    console.log(array);

    //dynamic pair (experimental)
    teams = [];
    var groups = group(array,6);
    if(groups[0].length == groups[5].length){
        console.log("Divisible by 6: " + array.length);
        groups[0][groups[0].length] = groups[1].splice(-1, 1);
        console.log("Created artificial offset!");
    }
    console.log(groups);
    //feeder arrays
    /*
    K1: 0
    K2: 1
    T1: 2
    T2: 3
    V1: 4
    V2: 5
    */
    var K1 = groups[0].concat(groups[4]).concat(groups[2]);
    var T1 = groups[2].concat(groups[0]).concat(groups[4]);
    var V1 = groups[4].concat(groups[2]).concat(groups[0]);
    var K2 = groups[1].concat(groups[3]).concat(groups[5]);
    var T2 = groups[3].concat(groups[5]).concat(groups[1]);
    var V2 = groups[5].concat(groups[1]).concat(groups[3]);

    var feeders = [K1,K2,T1,T2,V1,V2];

    //counters K12 T12 V12
    var counters = [0,0,0,0,0,0];

    for(var i =0; i<days; i++){
        var team = {
            date: i,
            k1: K1[counters[0]],
            k2: K2[counters[1]],
            t1: T1[counters[2]],
            t2: T2[counters[3]],
            v1: V1[counters[4]],
            v2: V2[counters[5]]
        };
        //console.log("K: {" + team.k1 + ", " + team.k2 + "} T: {" + team.t1 + ", " + team.t2+"} V: {" + team.v1 + ", " + team.v2 + "}");
        for(var j=0;j<counters.length;j++){
            counters[j]++;
            if(counters[j] >= feeders[j].length){
                counters[j] = 0;
            }
        }
        teams[teams.length] = team;
    }
    generated = teams;
    enable();
    console.log(teams);
    display(teams);
}


//enables the button
function enable(){
    $('#upload-button').prop('disabled', false);
    $('#upload-button').css("background-color","green");
    var lastStyle = $('style').last();
    lastStyle.html(lastStyle.html() + '\n#upload-button { color:red !important; }');
    $('#upload-button').css("color","white !important;");
}

function display(teams){
    console.log("Displaying");
    var myTableDiv = document.getElementById("schedule-container");
    var table = document.createElement('TABLE');
    table.className = "custom-table";
    var tableBody = document.createElement('TBODY');
    table.border = '1';
    table.appendChild(tableBody);
    
    var heading = ["Kitchen", "Trash","Vacuum"];
    
    //add headers!
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    
    var th = document.createElement('TH')
        th.setAttribute("colspan","1");
        th.appendChild(document.createTextNode("Date"));
        th.style.textAlign = "center";
        tr.appendChild(th);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.setAttribute("colspan","2");
        th.appendChild(document.createTextNode(heading[i]));
        th.style.textAlign = "center";
        tr.appendChild(th);
    }

    //TABLE ROWS
    for (i = 0; i < teams.length; i++) {
        var tr = document.createElement('TR'); //generate a row
        console.log(teams[i]);
        for (var key in teams[i]) {
            if (teams[i].hasOwnProperty(key)) {
                var td = document.createElement('TD');
                td.appendChild(document.createTextNode(teams[i][key]));
                tr.appendChild(td);
            }
        }
        tableBody.appendChild(tr);
    }  
    myTableDiv.appendChild(table);
}

//splits up an array of names into N semi-equal groups (largest groups will be 1 greater than the others)
function group(names,n){
    var extra = names.length % n;
    var minSize = (names.length - extra)/n;

    console.log(minSize + " : " + extra);
    //names = shuffle(names);
    var groups = [];
    for(var i=0; i<n; i++){
        groups[groups.length] = [];
    }

    var count = 0;

    var cap = 0;
    var pointer = -1;

    for(i=0;i<names.length;i++){
        if(cap <= 0){
            pointer++;
            var cap = minSize;
            if(extra > 0){
                cap++;
                extra--;
            }
        }
        var end = groups[pointer].length;
        groups[pointer][end] = names[i];
        cap--;
    }
    console.log("Split into " + n);
    return groups;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}