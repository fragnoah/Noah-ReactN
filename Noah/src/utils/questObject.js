function questObject(img, quest) {
    const o = {
        o:img = img;
        o:quest = quest; 
        o:toString = function() {
        console.log(o.quest);
    }
}
    return o;
}