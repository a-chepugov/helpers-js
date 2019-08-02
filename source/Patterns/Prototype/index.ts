export default abstract class Prototype {
    clone() {
        return Object.create(this);
    }
}
