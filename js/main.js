function generate() {
    var array = document.getElementById('name_input').value.split(/[ ]*,[ ]*/);
    console.log(array);
    var groups = group(array,3);

    var K = 0;var T = 1; var V = 2;

    //counters
    var cK = 0;var cT = 0;var cV = 0;

    var teams = [];

    //constant pair ordering
    for(var i=0; i<5; i++){
        if(cK >= groups[K].length){
            K = 1;
            cK = 0;
        }

        if(cT >= groups[T].length){
            T = 2;
            cT = 0;
        }

        if(cV >= groups[V].length){
            V = 0;
            cV = 0;
        }
        
        var team = {
            k: groups[K][cK],
            t: groups[T][cT],
            v: groups[V][cV]
        };
        
        console.log(team.k + " " + team.t + " " + team.v);
        
        cK++;
        cT++;
        cV++;
       
        teams[teams.length] = team;
    }

    //dynamic pair (experimental)
    
    
    console.log(teams);
}



//if we are at end of K, new K is T
//if we are at end of T, new T is V
//if we are at end of V, new V is K


function init(){
    document.getElementById('name_input').onkeydown = function(event) {
        if (event.keyCode == 13) {
            generate();
        }
    }
    console.log("Initialized");
}


//splits up an array of names into N semi-equal groups (largest groups will be 1 greater than the others)
function group(names,n){
    var extra = names.length % n;
    var minSize = (names.length - extra)/n;

    console.log(minSize + " : " + extra);
    names = shuffle(names);
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
    console.log(groups);
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