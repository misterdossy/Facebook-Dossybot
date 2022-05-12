// Inspired by discord.js

class Collection extends Map {
    /**
     * @param {Map} [data] Data in Collection
     */
    constructor(data = null) {
        super(data);
    }

    /**
     * @property {Function} at Get object at that index
     * @param {Number} index - index of wanted value
     */
    at(index) {
        index = Math.floor(index);
        return [...this.values()].at(index);
    }

    /**
     * @property {Function} clone Get a copy of the collection
     * @returns {Collection}
     */
    clone() { return new Collection(this); }

    /**
     * @property {Function} concat Get a collection composed of elements from other collections
     * @returns {Collection}
     */
    concat() {
        let newCollection = this.clone();
        let validCollections = [];
        for (arg in arguments) {
            if (arg instanceof Collection) { validCollections.push(arg) }
        }
        for (validCollection of validCollections) {
            for ([key, value] of validCollection) {
                newCollection.set(key, value)
            }
        }
        return newCollection;
    }

    /**
     * @property {Function} difference Gets collection with elements found in one collection or other but not both
     * @param {Collection} other
     * @returns {Collection}
     */
    difference(other) {
        if (!(other instanceof Collection)) {
            throw new TypeError("input of difference() is not a collection");
        }
        let newCollection = new Collection();
        for (let [key, value] of other) {
			if (!this.has(key)) newCollection.set(key, value);
		}
		for (let [key, value] of this) {
			if (!other.has(key)) newCollection.set(key, value);
		}
		return newCollection;
    }

    /**
     * @property {Function} each Does something to all elements and returns the collection object itself
     * @param {Function} fn Function to execute on all elements
     * @returns {Collection}
     */
    each(fn) {
        this.forEach(fn);
		return this;
    }

    ensure(key, defaultValGen) {
        if (this.has(key)) { return this.get(key); }
        let defaultVal = defaultValGen(key, this);
		this.set(key, defaultVal);
		return defaultVal;
    }

    equals(collection) {
		if (!collection) return false;
		if (this === collection) return true;
		if (this.size !== collection.size) return false;
		for (let [key, value] of this) {
			if (!collection.has(key) || value !== collection.get(key)) {
				return false;
			}
		}
		return true;
    }

    /**
     * @param {Function} fn
     */
    every(fn) {
        for (let [key, value] of this) { if (!fn(value, key, this)) { return false; } }
		return true;
    }

    /**
     * @param {Function} fn
     */
    filter(fn) {
		let results = new Collection();
		for (let [key, value] of this) { if (fn(value, key, this)) { results.set(key, value); } }
		return results;
    }

    /**
     * @param {Function} fn
     */
    find(fn) {
        for (let [key, value] of this) { if (fn(value, key, this)) { return value }; }
        return null;
    }

    /**
     * @param {Function} fn
     */
    findKey(fn) {
        for (let [key, value] of this) { if (fn(value, key, this)) { return key }; }
        return null;
    }

    first() { return [...this.values()][0]; }

    firstKey() { return [...this.keys()][0]; }

    /**
     * @param {Function} fn
     */
    flatMap(fn) {
        let newCollection = new Collection();
        let keys = [...this.keys()];
        let values = [...this.values()].flatMap(fn);
        for (let i = 0; i < newValues.length; i++) { newCollection.set(keys[i], values[i]) }
        return newCollection
    }

    getJSON() { return [...this.values()] }

    hasAll(keys) {
        let availableKeys = [...this.keys()];
        for (key of keys) { if (!(key in availableKeys)) return false; }
        return true;
    }

    hasAny(keys) {
        let availableKeys = [...this.keys()];
        for (key of keys) { if ((key in availableKeys)) return true; }
        return false;
    }

    intersect(other) {
        if (!(other instanceof Collection)) {
            throw new TypeError("input of difference() is not a collection");
        }

        let newCollection = new Collection();

        for (let [key, value] of other) {
            if ((this.has(key)) && (other.has(key))) {
                newCollection.set(key, value);
            }
        }

        return newCollection;
    }

    /**
     * @param {Number} index - index of wanted key
     */
    keyAt(index) { return this.keyAt(index); }

    last() { return [...this.values()][this.size - 1]; }

    lastKey() { return [...this.keys()][this.size - 1]; }

    // map() {}

    // mapValues() {}

    // merge() {}

    // partition() {}

    // partition() {}

    random() { return [...this.values()][ Math.floor(Math.random() * this.size) ] }

    randomKey() { return [...this.keys()][ Math.floor(Math.random() * this.size) ] }

    // reduce() {}

    reverse() {
        let newCollection = new Collection();
        let keys = [...this.keys()].reverse();
        let values = [...this.values()].reverse();

        for (let i = 0; i < this.size; i++) {
            newCollection.set(keys[i], values[i])
        }

        return newCollection;
    }

    /**
     * @param {Function} fn
     */
    some(fn) {
        for (let [key, value] of this) { if (fn(value, key, this)) { return true }; }
        return false;
    }

    // sort() {}

    // sorted() {}

    // sweep() {}

    // tap() {}

    // combineEntries() {}
}

module.exports = Collection;