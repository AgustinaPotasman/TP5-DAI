import ProvincesRepository from '../repositories/provinces-repository.js';
export default class ProvincesService {
    getAllAsync = async () => {
        const repo = new ProvincesRepository();
        const ProvinceArray = await repo.getAllAsync();
        return ProvinceArray;
    }
    getByIdAsync = async (id) => {
        return await ProvincesRepository.getByIdAsync(id);
    }
    createAsync= async (entity) => {
        const repo = new ProvincesRepository();
        const ProvinceArray = await repo.createAsync(entity);
        return ProvinceArray;
    }
    
    updateProvince = async (entity) => {
        const repo = new ProvincesRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }
    deleteProvince = async (provAEliminar) => {
        const repo = new ProvincesRepository();
        await repo.deleteAsync(provAEliminar);
    }
}