
1 $ ( document ) . ready ( function () {
2
3 // Add a new course row
4 $ (’# addCourse ’) . click ( function () {
5 var row = $ (’.course - row ’) . first () . clone () ;
6 row . find (’input ’) . val (’’) ;
7 row . append (
8 ’<div class =" col - auto " >’ +
9 ’<button type =" button " ’ +
10 ’class =" btn btn - danger remove -row " >X </ button >’ +
11 ’ </div >’
  12 ) ;
13 $ (’# courses ’) . append ( row ) ;
14 }) ;
15
16 // Remove a course row
17 $ ( document ) . on (’click ’, ’.remove - row ’, function () {
18 if ( $ (’.course -row ’) . length > 1) {
19 $ ( this ) . closest (’.course -row ’) . remove () ;
20 }
21 }) ;
22
23 // Submit via AJAX
24 $ (’# gpaForm ’) . submit ( function ( e ) {
25 e . preventDefault () ;
75 }
76 } ,
77 error : function () {
78 $ (’# result ’) . html (
79 ’<div class =" alert alert - danger " >’ +
80 ’Server error occurred .’ +
81 ’ </div >’
82 ) ;
83 }
84 }) ;
85 }) ;
86 }) ;  
26
27 // Client - side validation
28 var valid = true ;
29 $ (’[ name =" course []"] ’) . each ( function () {
30 if ( $ ( this ) . val () . trim () === ’’) valid = false ;
31 }) ;
32 $ (’[ name =" credits []"] ’) . each ( function () {
33 if ( isNaN ( $ ( this ) . val () ) || parseFloat ( $ ( this ) . val () ) <= 0) {
34 valid = false ;
35 }
36 }) ;
37 if (! valid ) {
38 $ (’# result ’) . html (
39 ’<div class =" alert alert - warning " >’ +
40 ’Please enter valid values in all fields .’ +
41 ’ </div >’
42 ) ;
43 return ;
44 }
45
46 $ . ajax ({
47 url : ’calculate .php ’,
48 type : ’POST ’,
49 data : $ ( this ) . serialize () ,
50 dataType : ’json ’,
51 success : function ( response ) {
52 if ( response . success ) {
53 var alertClass = ’alert - info ’;
54 if ( response . gpa >= 3.7) {
55 alertClass = ’alert - success ’;
56 } else if ( response . gpa >= 3.0) {
57 alertClass = ’alert - info ’;
58 } else if ( response . gpa >= 2.0) {
59 alertClass = ’alert - warning ’;
60 } else {
61 alertClass = ’alert - danger ’;
62 }
63 $ (’# result ’) . html (
64 ’<div class =" alert ’ + alertClass + ’" >’ +
65 response . message +
66 ’ </div >’ +
67 response . tableHtml
68 ) ;
69 } else {
70 $ (’# result ’) . html (
71 ’<div class =" alert alert - danger " >’ +
72 response . message +
73 ’ </div >’
74 ) ;
