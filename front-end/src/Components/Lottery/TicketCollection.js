export default class TicketCollection extends Array {
    sum(key){
        return this.reduce((a, b) => a + (b[key] || 0), 0)
    }
}