const player1 = {
    NOME: "mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}; 

const player2 = {
    NOME: "luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};


async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`)
}

async function declareWinner(character1, character2){
    console.log("Resultado final:")
    console.log(`${character1.NOME} : ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME} : ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`${character1.NOME} venceu a corrida!`)
    else if(character1.PONTOS < character2.PONTOS)
        console.log(`${character2.NOME} venceu a corrida!`)
    else
        console.log("A corrida terminou em empate")
    
}

async function playRaceEngine(caracter1, caracter2){
    for(let round = 1; round <= 5; round++){
        console.log(`rodada ${round}`)

        let block = await getRandomBlock()
        console.log(`Bloco ${block}`)
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
    
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0
    
        if(block == "RETA"){
            totalTestSkill1 = diceResult1 + caracter1.VELOCIDADE
            totalTestSkill2 = diceResult2 + caracter2.VELOCIDADE
            await logRollResult(caracter1.NOME,"velocidade",diceResult1,caracter1.VELOCIDADE)
            await logRollResult(caracter2.NOME,"velocidade",diceResult1,caracter2.VELOCIDADE)
        }
        if(block == "CURVA"){
            totalTestSkill1 = diceResult1 + caracter1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + caracter2.MANOBRABILIDADE
            await logRollResult(caracter1.NOME,"manobrabilidade",diceResult1,caracter1.MANOBRABILIDADE)
            await logRollResult(caracter2.NOME,"manobrabilidade",diceResult1,caracter2.MANOBRABILIDADE)
        }
        if(block == "CONFRONTO"){

            let powerResult1 = diceResult1 + caracter1.PODER
            let powerResult2 = diceResult2 + caracter2.PODER   

            console.log(`${caracter1.NOME} confrontou com ${caracter2.NOME}`)
            await logRollResult(caracter1.NOME,"poder",diceResult1,caracter1.PODER)
            await logRollResult(caracter2.NOME,"poder",diceResult1,caracter2.PODER)

            let bomb = Math.floor(Math.random() * 2) + 1 // bomb == 2 casco == 1
            let bonus = Math.floor(Math.random() * 2) + 1 // bonus == 1

            if(powerResult1 > powerResult2 && caracter2.PONTOS > 0){
                console.log(`${caracter1.NOME} venceu o confronto com ${bomb>1?"BOMBA!!":"CASCO!!"} ${bonus==1?"BONUS +1 Ponto":""} ${caracter2.NOME} perdeu ${bomb} ponto(s) `)
                caracter2.PONTOS-=bomb
                caracter2.PONTOS < 0? 0 : caracter2.PONTOS
                bonus == 1? caracter1.PONTOS++:caracter1.PONTOS;
            }
            if(powerResult2 > powerResult1 && caracter1.PONTOS > 0){
                console.log(`${caracter2.NOME} venceu o confronto com ${bomb>1?"BOMBA!!":"CASCO!!"} ${bonus==1?"BONUS +1 Ponto":""} ${caracter1.NOME} perdeu ${bomb} ponto(s) `)
                caracter1.PONTOS-=bomb
                caracter1.PONTOS < 0? 0 : caracter1.PONTOS
                bonus == 1? caracter2.PONTOS++:caracter2.PONTOS;
            }
            console.log(powerResult1==powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido" : "")

        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${caracter1.NOME} marcou um ponto!`)
            caracter1.PONTOS++
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${caracter2.NOME} marcou um ponto!`)
            caracter2.PONTOS++
        }
        console.log("-------------------------------------------------------------")
    }
    
}

(async function main(){
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando \n`)
    await playRaceEngine(player1,player2)
    await declareWinner(player1,player2)
})();