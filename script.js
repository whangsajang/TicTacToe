
var player1_array = [];
var player2_array = [];
var play_count = 1;
var cell_count = 3;
var cell_win_count = 3;
var win = false;
var player1_wins = 0;
var player2_wins = 0;

function make_move() {
    //main function executed on click. add image to block, call check_win, call check_draw, increase play_count
    self = $(this);

    if (self.find('.x').css('display') == 'none' && self.find('.o').css('display') == 'none') {
        if (play_count % 2 == 1) {
            self.find('.x').show();

            /////creating object of player's move
            var column = null;
            var row = null;
            for (i = 0; i < cell_count; i++) {
                var current_column = "column_" + i;
                var current_row = "row_" + i;
                if (self.hasClass(current_column)) {
                    column = i;
                }
                if (self.hasClass(current_row)) {
                    row = i;
                }
            }
 
            var player_move = {
                column: column,
                row: row,
                value: 'player1'
            };
            player1_array.push(player_move);
            check_win(player_move);
            check_draw();
            play_count++;
        }
        else {

            self.find('.o').show();
            var column = null;
            var row = null;
            for (i = 0; i < cell_count; i++) {
                var current_column = "column_" + i;
                var current_row = "row_" + i;
                if (self.hasClass(current_column)) {
                    column = i;
                }
                if (self.hasClass(current_row)) {
                    row = i;
                }
            }

            var player_move = {
                column: column,
                row: row,
                value: 'player2'
            }
            player2_array.push(player_move);
            check_win(player_move);
            check_draw();
            play_count++;
        }
        $('.player').toggleClass('player-turn')
    }
}

function check_win(object) {
    //loop through array to compare win
    if (object.value == 'player1') {
        var temp_check_array = [];

        //check column win
        for (i = 0; i < player1_array.length; i++) { //fill check array with all x's in that column
            var current_object = player1_array[i];
            if (current_object.column == object.column) {
                temp_check_array.push(current_object);
            }
        }
        if (temp_check_array.length >= cell_win_count) {       //checking if the x's are consecutive in that column

            temp_check_array.sort(function compare(a, b) { //sorting array from least number to greatest number of column
                if (a.row > b.row) {
                    return 1;
                }
                else if (a.row < b.row) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var first_check_object = temp_check_array[0];
            var current_check_object = temp_check_array[0];

            for (i = 1; i < temp_check_array.length; i++) {
                var next_object = temp_check_array[temp_check_array.indexOf(current_check_object) + 1];
                if (next_object.row == current_check_object.row + 1) {
                    current_check_object = temp_check_array[i];

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count - 1)) {
                        win = true;
                        //display('Player 1 Wins!');
                        player1_wins++;

                        display('player1');

                    }
                }
                else {
                    first_check_object = temp_check_array[i];
                }

            }
        }
        //check row win
        if (!win) {

            var temp_check_array = [];

            for (i = 0; i < player1_array.length; i++) { //fill check array with all x's in that column
                var current_object = player1_array[i];
                if (current_object.row == object.row) {
                    temp_check_array.push(current_object);
                }
            }

            if (temp_check_array.length >= cell_win_count) {       //checking if the x's are consecutive in that column

                temp_check_array.sort(function compare(a, b) { //sorting array from least number to greatest number of column
                    if (a.column > b.column) {
                        return 1;
                    }
                    else if (a.column < b.column) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });

                var first_check_object = temp_check_array[0];
                var current_check_object = temp_check_array[0];

                for (i = 1; i < temp_check_array.length; i++) {
                    var next_object = temp_check_array[temp_check_array.indexOf(current_check_object) + 1];
                    if (next_object.column == current_check_object.column + 1) {
                        current_check_object = temp_check_array[i];

                        if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count - 1)) {
                            win = true;
                            player1_wins++;
                            display('player1');

                        }
                    }
                    else {
                        first_check_object = temp_check_array[i];
                    }

                }
            }
        }

        //check diagonals
        if (!win) {
            temp_check_array = player1_array;

            temp_check_array.sort(function compare(a, b) { //sorting player 1 array from least number to greatest number of column
                if (a.column > b.column) {
                    return 1;
                }
                else if (a.column < b.column) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var first_check_object = temp_check_array[0];
            var current_check_object = temp_check_array[0];
            var current_check_counter = 0;
            var current_check_counter2 = 0;

            for (i = 1; i < temp_check_array.length; i++) {
                if (temp_check_array[i].row == current_check_object.row + 1 && temp_check_array[i].column == current_check_object.column + 1 && current_check_counter2 == 0) {
                    current_check_object = temp_check_array[i];
                    current_check_counter++;

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count-1)) {
                        player1_wins++;
                        display('player1');
                    }
                }
                else if (temp_check_array[i].row == current_check_object.row - 1 && temp_check_array[i].column == current_check_object.column + 1 && current_check_counter == 0) {
                    current_check_object = temp_check_array[i];
                    current_check_counter2++;

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count-1)) {
                        player1_wins++;
                        display('player1');
                    }
                }
                else {
                    first_check_object = temp_check_array[i];
                }

            }
        }

    }

    /*************** PLAYER 2 CHECK ******************/
    if (object.value == 'player2') {
        var temp_check_array = [];

        //check column win
        for (i = 0; i < player2_array.length; i++) { //fill check array with all x's in that column
            var current_object = player2_array[i];
            if (current_object.column == object.column) {
                temp_check_array.push(current_object);
            }
        }
        if (temp_check_array.length >= cell_win_count) {       //checking if the x's are consecutive in that column

            temp_check_array.sort(function compare(a, b) { //sorting array from least number to greatest number of column
                if (a.row > b.row) {
                    return 1;
                }
                else if (a.row < b.row) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var first_check_object = temp_check_array[0];
            var current_check_object = temp_check_array[0];

            for (i = 1; i < temp_check_array.length; i++) {
                var next_object = temp_check_array[temp_check_array.indexOf(current_check_object) + 1];
                if (next_object.row == current_check_object.row + 1) {
                    current_check_object = temp_check_array[i];

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count - 1)) {
                        win = true;
                        player2_wins++;
                        display('player2');
                    }
                }
                else {
                    first_check_object = temp_check_array[i];
                }

            }
        }

        //check row win
        if (!win) {

            var temp_check_array = [];

            for (i = 0; i < player2_array.length; i++) { //fill check array with all x's in that column
                var current_object = player2_array[i];
                if (current_object.row == object.row) {
                    temp_check_array.push(current_object);
                }
            }
            if (temp_check_array.length >= cell_win_count) {       //checking if the x's are consecutive in that column

                temp_check_array.sort(function compare(a, b) { //sorting array from least number to greatest number of column
                    if (a.column > b.column) {
                        return 1;
                    }
                    else if (a.column < b.column) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });

                var first_check_object = temp_check_array[0];
                var current_check_object = temp_check_array[0];

                for (i = 1; i < temp_check_array.length; i++) {
                    var next_object = temp_check_array[temp_check_array.indexOf(current_check_object) + 1];
                    if (next_object.column == current_check_object.column + 1) {
                        current_check_object = temp_check_array[i];

                        if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count - 1)) {
                            win = true;
                            player2_wins++;
                            display('player2');
                        }
                    }
                    else {
                        first_check_object = temp_check_array[i];
                    }

                }
            }
        }

        //check diagonals
        if (!win) {
            temp_check_array = player2_array;

            temp_check_array.sort(function compare(a, b) { //sorting player 2 array from least number to greatest number of column
                if (a.column > b.column) {
                    return 1;
                }
                else if (a.column < b.column) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var first_check_object = temp_check_array[0];
            var current_check_object = temp_check_array[0];
            var current_check_counter = 0;
            var current_check_counter2 = 0;


            for (i = 1; i < temp_check_array.length; i++) {
                if (temp_check_array[i].row == current_check_object.row + 1 && temp_check_array[i].column == current_check_object.column + 1 && current_check_counter2 == 0) {
                    current_check_object = temp_check_array[i];
                    current_check_counter++;

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count-1)) {
                        player2_wins++;
                        display('player2');
                    }
                }
                else if (temp_check_array[i].row == current_check_object.row - 1 && temp_check_array[i].column == current_check_object.column + 1 && current_check_counter ==0) {
                    current_check_object = temp_check_array[i];
                    current_check_counter2++;

                    if (temp_check_array.indexOf(current_check_object) == temp_check_array.indexOf(first_check_object) + (cell_win_count-1)) {
                        player2_wins++;
                        display('player2');
                    }
                }
                else {
                    first_check_object = temp_check_array[i];
                }
            }
        }

    }
}

function check_draw() {
    if (play_count == cell_count * cell_count) {
        $('.cats-game').fadeIn('slow');
    }
}

function create_modal_options(second)  {
    if (!second) {
        for (i = 6; i <= 20; i++) {
            var text = i + " x " + i;
            var option = $('<option>').val(i).text(text);
            $('#sel1').append(option);
        }
    }

    else {
        for (i = 7; i <= cell_count; i++) {
            var text = i + " x " + i;
            var option = $('<option>').val(i).text(i);
            $('#sel2').append(option);
        }
    }
}

function game_board() {
    //dynamically creates board according to cell_count
    $('.start-game-button').hide();
    if ($("input[name='optradio']:checked").val()) {
        cell_count = parseInt($("input[name='optradio']:checked").val());
    }
    else {
        cell_count = parseInt($('#sel1 option:selected').val());
    }

    cell_win_count = parseInt($('#sel2 option:selected').val());

    for (i=0; i<cell_count; i++) { //row count
        for (j=0; j<cell_count; j++) { //column count
            var column_class = "column_"+j;
            var row_class = "row_"+i;
            var gamebox_size = (100/cell_count) + '%';
            var new_div = $('<div>', {
                class : ("cells "+ column_class + " " + row_class),
                width: gamebox_size,
                height: gamebox_size
            });
            var image_x = $('<img>').addClass('x').attr('src', 'images/x.png');
            var image_o = $('<img>').addClass('o').attr('src', 'images/o.png');
            new_div.append(image_x, image_o);
            $('.game-area').append(new_div);
        }
    }
    $('.x').hide();
    $('.o').hide();
    $('.cells').click(make_move);

    $('.reset').click(function(){
        reset();
    });
}

function reset() {
    //clear all the objects in arrays, clear gameboard
    player1_array = [];
    player2_array = [];
    play_count = 1;
    $('.x').fadeOut('slow'); // remove or toggle class??
    $('.o').fadeOut('slow');
    $('.x-wins').fadeOut('slow');
    $('.o-wins').fadeOut('slow');
    $('.cats-game').fadeOut('slow');
    win = false;
}

function display(player) {
    //shows stats, and highlights which player's turn it is

    if(player == 'player1') {
        $('.x-wins').fadeIn('slow');
        $('.p1-score .value').text(player1_wins);
    }
    else if(player == 'player2') {
        $('.o-wins').fadeIn('slow');
        $('.p2-score .value').text(player2_wins);
    }
}

// function store(object, number) {
//     var key_name = object + number;
//     localStorage.setItem(object)
// }

$(document).ready(function(){
    create_modal_options();
    $('.close-modal').click(function(){
        game_board();
    });
    $('#sel1').change(function() {
        cell_count = parseInt($('#sel1 option:selected').val());
        create_modal_options('second');
    });
    $('.x-wins').hide();
    $('.o-wins').hide();
    $('.cats-game').hide();
});