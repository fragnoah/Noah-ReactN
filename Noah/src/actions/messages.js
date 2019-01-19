import { Alert } from 'react-native';

/*

*/

export const startInfo = () => {
    Alert.alert(
        'Information',
        'In der Prüfung SBF Binnen Segeln werden 30 Fragen aus dem Fragenkatalog gestellt.'
        + 'Um die Prüfung zu bestehen, musst du 7 Basisfragen, 23 Spezialfragen (21 Binnenfragen und 2 Segelfragen) richtig beantworten.'
        + ' Jede Prüfungsbogen Variante simuliert den exakten Ablauf der Prüfung für den SBF unter Segeln. Bei der Prüfung hast du 60 Minuten Zeit, um alle Fragen zu beantworten.'
        + ' Am Ende eines Durchlaufs siehst du, ob du eine Prüfung bestanden hättest. Tipp: Nutze das Pin- Symbol,'
        + ' um Fragen für später zu speichern und noch einmal zu wiederholen. Optional: Damit du alle Fragen mindestens'
        + ' einmal im Prüfungsmodus richtig beantwortet hast, empfehlen wir dir, alle Prüfungsbogen Varianten einmal zu durchlaufen.'
        + ' Wir wünschen dir viel Erfolg!',
        [
        { text: 'Abbrechen', onPress: () => false, style: 'cancel' },
        { text: 'OK', onPress: () => true },
        ],
        { cancelable: true }
    );
};

export const resultInfo = () => {
    Alert.alert(
        'Information',
        'Statistik: Dies ist eine persönliche Statistik, in der du die Anzahl deiner bestanden Fragebögen'
        + ' und die Anzahl der noch zu bestehen Fragebögen nachverfolgen kannst. Tipp: Nutze das Pin- Symbol,'
        + ' um schwierige Fragen für später zu speichern und noch einmal zu wiederholen und deine Statistik zu verbessern.',
        [
        { text: 'Abbrechen', onPress: () => false, style: 'cancel' },
        { text: 'OK', onPress: () => true },
        ],
        { cancelable: true }
    );
};
