const {
    Barang
} = require('./barang.enttity');

const getBarang = () => {
    const data = Barang;
    return data;
}
const getBarangByID = (id) => {
    const data = Barang;
    data.find;
}

const postBarang = (input) => {
    const data = Barang;
    data.push({
        id: input.id,
        nama: input.nama,
        stok: input.stok
    });
    return data;
}



const updateBarang = (id) => {
    return `Ini Update Barang ${id}`;
}

const deleteBarang = (id) => {
    return `Ini Delete Barang ${id}`;
}

module.exports = {
    getBarang,
    postBarang,
    deleteBarang,
    updateBarang
};