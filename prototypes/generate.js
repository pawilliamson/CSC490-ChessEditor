 /**
 * Creates 8x8 Matrix of Div Elements 
 * Last Modified: Monday, February 22, 2021
 * 
 * This alternates classes and assigns an id to each div
 * that corresponds to its position on the chess board.
 * 
 * name: generateBoard
 * @param element HTML document element.
 * @parem classA First alternating html class.
 * @param classB Second alternating html class.
 * @return null
 * 
 */
function generateBoard(element, classA, classB){
	for(row = 8; row > 0; row--){
		let str ="<div class=\"row\">";
		for( col = 0; col < 8; col++){
			str += "<div id=\"" + (String.fromCharCode(col+97) + row.toString()) +"\" class=\"";
			if( (row + col) % 2 == 0 )
				 str +=  classA + "\"></div>";
			else
				str +=  classB + "\"></div>";
		}
		str += "</div>";
		element.innerHTML += str;
	}
}
