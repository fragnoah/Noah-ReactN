/*
    Design aller Buttons auf den Question- und
    Repeat-Seiten
*/

export const questionButtonStyle = {
    navButtonImageStyle: {    
        height: 18,
        width: 18,
    },
    navButtonStyle: {
        flex: 1,
        width: '40%',
        marginLeft: 3,
        marginRight: 3,
        marginTop: 0,
        flexDirection: 'column',
    },
    markButtonStyle: {
        //height: 50,
        width: '10%',
        flex: 0,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'center',
        //justifyContent: 'space-around',
        //flex: 0,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 0,
        elevation: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    markButtonImageStyle: {
        alignSelf: 'center',
        //height: null,
        //width: 25,
        flex: 1,
        resizeMode: 'contain'
    },
    navTextStyle: {
        justifyContent: 'flex-start',
        color: '#007aff',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: '300',
    },
    navTextStyle2: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        color: '#007aff',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: '300',
    },
    cardStyle: {
        backgroundColor: 'rgba(255,255,255, 0.3)',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        flex: 1
    },
};

//Halbtransparenter Layer
export const questionCardStyle = {
    navCardStyle: {
        //paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 0,
    },
    cardStyle: {
        backgroundColor: 'rgba(255,255,255, 0.3)',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        flex: 1
    },
    questionSection: { //Fragetext & Elemente
        backgroundColor: '#8CD6FC',        
    },
    imgStyle: {  // Bild in Frage; nur an der Höhe schrauben!
        height: 80,
        width: '100%',
        resizeMode: 'contain', 
      },
};

export const highlighter = {
    lighted: {
        backgroundColor: 'yellow',
    },
};

export const userMessage = {
    flashMessage: {
        zIndex: 1000,
    }
};
