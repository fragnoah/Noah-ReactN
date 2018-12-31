/*
    Design aller Buttons auf den Question- und
    Repeat-Seiten
*/

export const questionButtonStyle = {
    navButtonImageStyle: {    
        height: 20,
        width: 20,
    },
    navButtonStyle: {
        flex: 1,
        width: '40%',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        flexDirection: 'column',
    },
    markButtonStyle: {
        //height: 50,
        //width: '15%',
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
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        elevation: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    markButtonImageStyle: {
        alignSelf: 'center',
        height: 30,
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },

    navBar: {
        flexDirection: 'row', 
        flex: 0
    },
    navTextStyle: {
        justifyContent: 'flex-start',
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '600',
    },
    navTextStyle2: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '600',
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
