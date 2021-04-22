export class Translate{
	function parse(fen:string){
	return fen.split(" ");
	}
	function parseBoard(fen:string){
	let rows = fen.split("/");
	
	}
	function difference(a:stirng, b:string){
		let boardA = a.split("/");
		let boardB = b.split("/");
		for(val row = 0; row <= 7; row++){
			let limit = (boardA[row].length > boardB[row].length)?
				boardA[row].length:boardB[row].length;
			let adjust = {a: 0, b:0};
			for(val cell = 0; cell <= limit;cell++){
				cellA = boardA[row][cell+adjust.a];
				cellB = boardB[row][cell+adjust.b];
				if(cellA != cellB)
				if(isDigit(cellA) != isDigit(cellB)){ 
					// TODO If one or the other is a digit
					if(isDigit(cellA)){
					  	
					}else{


					}
				
				}else{
					if(isDigit(cellA) && isDigit(cellB)){
						// TODO If Both Are Digits

					}else{
					 // TODO If none are digis

					}
				}
				

			}

		}
	
	}
	function isDigit(fen:string){
	return isNaN(Number(fen));
	}

}
