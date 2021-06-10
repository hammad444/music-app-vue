export default{
    formatTime(time){
        const mins = Math.floor(time/60)||0;
        const sec = Math.round((time-mins*60)||0);

        return `${mins}:${sec < 10?'0':''}${sec}`
    }
}