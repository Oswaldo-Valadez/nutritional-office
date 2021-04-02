export function dateTimeToDate(date) {
    let originalDate = new Date(date);
    return originalDate.toLocaleDateString('es-MX');
}

export function calcIMC(peso, talla) {
    let IMC = peso / Math.pow(talla, 2);
    let resultado;

    if (IMC < 18.5) resultado = 'Bajo Peso';
    else if (IMC < 24.9) resultado = 'Peso Normal'
    else if (IMC < 29.9) resultado = 'Sobrepeso'
    else if (IMC < 39.9) resultado = 'Obsesidad'
    else resultado = 'Obesidad Extrema'

    return {
        imc: IMC.toFixed(2),
        resultado: resultado
    }
}

export function calcICC(genero, cintura, cadera) {
    let ICC = cintura / cadera;
    let resultado;

    if ((genero === 0 && cintura <= 102) || (genero === 1 && cintura <= 88)) {
        if (ICC < 29.9) resultado = 'Aumentado'
        else if (ICC < 34.9) resultado = 'Alto'
        else if (ICC < 34.9) resultado = 'Alto'
        else resultado = 'Extremadamente Alto'

    }
    else if ((genero === 0 && cintura > 102) || (genero === 1 && cintura > 88)) {
            if (ICC < 29.9) resultado = 'Alto'
            else if (ICC < 34.9) resultado = 'Muy Alto'
            else if (ICC < 34.9) resultado = 'Muy Alto'
            else resultado = 'Extremadamente Alto'
    }
    else {
        resultado = 'Algo salió mal jaja'
    }

    return {
        icc: ICC.toFixed(2),
        resultado: resultado
    }
}

export function getIMCResult(IMC) {
    if (IMC < 18.5) return 'Bajo Peso';
    else if (IMC < 24.9) return 'Peso Normal'
    else if (IMC < 29.9) return 'Sobrepeso'
    else if (IMC < 39.9) return 'Obsesidad'
    else return 'Obesidad Extrema'
}

export function getICCResult(ICC, cintura, genero) {
    if ((genero === 0 && cintura <= 102) || (genero === 1 && cintura <= 88)) {
        if (ICC < 29.9) return 'Aumentado'
        else if (ICC < 34.9) return 'Alto'
        else if (ICC < 34.9) return 'Alto'
        else return 'Extremadamente Alto'

    }
    else if ((genero === 0 && cintura > 102) || (genero === 1 && cintura > 88)) {
            if (ICC < 29.9) return 'Alto'
            else if (ICC < 34.9) return 'Muy Alto'
            else if (ICC < 34.9) return 'Muy Alto'
            else return 'Extremadamente Alto'
    }
    else {
        return 'Algo salió mal jaja'
    }
}