import listAlphaBetKanji from "./listAlphaBetKanji.json"
import listAlphaBetKatakana from "./listAlphaBetKatakana.json"
import listAlphaBetHiragana from "./listAlphaBetHiragana.json"

export default function randomVoca(ngonNgu) {
    var min = 0;
    var max = 0;
    var array = null;
    var Random;
    if (ngonNgu==="Kanji") {
        max = listAlphaBetKanji.length - 1;
        Random = parseInt(min + (Math.random() * (max - min)));
        return listAlphaBetKanji.slice(Random, Random+1);
    } 
    else if (ngonNgu==="Katakana") {
        max = listAlphaBetKatakana.length - 1;
        Random = parseInt(min + (Math.random() * (max - min)));
        return listAlphaBetKatakana.slice(Random, Random+1);
    } else if (ngonNgu==="Hiragana") {
        max = listAlphaBetHiragana.length - 1;
        Random = parseInt(min + (Math.random() * (max - min)));
        return listAlphaBetHiragana.slice(Random, Random+1);
    }
    return array
}