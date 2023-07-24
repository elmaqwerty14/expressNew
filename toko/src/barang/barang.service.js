const {
    Barang
} = require('./barang.enttity');

const getBarang = () => {
    const data = Barang;
    return data;
}
const getBarangByID = (id) => {
    const data = Barang;
    const findData = data.find((item) => {
        if(item.id == id){
            return item;
        }
    });
    // console.log(findData)
    if(!findData){
        return null;
    }
    return findData;
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



const updateBarang = (id, input) => {
    const { 
        nama,
        stok
    } = input;

    const data = Barang;

    const indexData = data.findIndex((item) => item.id == id);

    if(indexData < 0){
        return null;
    }

    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
}

const deleteBarang = (id) => {
    const data = Barang;
    const indexData = data.findIndex((item) => item.id == id);
    if(indexData < 0){
        return null;
    }

    // [1,2,3,4] splice jumlah data yang mau dihapus dari index
    data.splice(indexData, 1);
    return data;
}

module.exports = {
    getBarang,
    getBarangByID,
    postBarang,
    deleteBarang,
    updateBarang
};