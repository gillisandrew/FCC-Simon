Simon = (function() {
    // green => 0; red => 1; blue => 2; yellow => 3;
    var exports = {};
    var sounds = [
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    ];
    var step_number = 0;
    var cpu_sequence = [];
    var user_sequence = [];
    var is_strict = false;

    
    function playSequence(n) {
        sounds[cpu_sequence[n]].play();
        n++;
        setTimeout(function() {
            if(n < cpu_sequence.length) {
                playSequence(n);
            }
        }, 2000);
    }
    function nextStep() {
        console.log('RIGHT');
        if(user_sequence.length == cpu_sequence.length) {
            cpuSelect();
        }
        
    }
    function cpuSelect() {
        user_sequence = [];
        ++step_number;
        var cpu_select = Math.floor(Math.random() * 4);
        cpu_sequence.push(cpu_select);
        setTimeout(function() {
            playSequence(0);
        }, 2000);
    }
    function failedStep() {
        console.log('WRONG');
        console.log(cpu_sequence);
        console.log(user_sequence);
        console.log(cpu_sequence == user_sequence)
        if(is_strict) {
            exports.reset();
            exports.play();
        }else {
            user_sequence = [];
            setTimeout(function() {
                playSequence(0);
            }, 2000);
        }
    }
    function compareSequence(user, cpu) {
        var i = user.length - 1;
        if(user[i] == cpu[i]) {
            nextStep();
        }else {
            failedStep();
        }
    }
    exports.press = function(e) {
        sounds[e].play();
        user_sequence.push(e);
        compareSequence(user_sequence, cpu_sequence);
    }
    exports.toggleStrict = function() {
        return is_strict = !is_strict;
    }
    exports.reset = function() {
        step_number = 0;
        cpu_sequence = [];
        user_sequence = [];
    }
    exports.start = function() {
        nextStep();
    }
    return exports;
})();