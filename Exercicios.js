//Curso JavaScript e TypeScript//
//----------EXERCÍCIOS---------//

/* 1) //Não perder o valor das variáveis/trocar sem precisar de variavel auxiliar:
let varA = 'A'; //B
let varB = 'B'; //C
let varC = 'C'; //A

[varA, varB, varC] = [varB, varC, varA];
console.log(varA, varB, varC);
*/

/* 2) //Função para retornar o maior valor de 2 números:
    function max1(x, y){
        if (x > y) return x;            //se maior retorna X
        return y;                       // se não, retorna Y
    }
    //abreviando as linhas:
    function max2(x, y){
        return x > y ? x : y;
    }
    //ou poderia ser:
    const max3 = (x, y) => x > y ? x : y;
    console.log(max3(10, 20));
*/

/* 3) //Função para saber se a imagem está no modo paisagem (true/false):
//paisagem = largura > altura
const ePaisagem = (largura, altura) => largura > altura ? true : false;
console.log(ePaisagem(20, 15));*/