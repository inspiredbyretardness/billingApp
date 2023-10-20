package com.billapp.billapp.Service;


import com.billapp.billapp.Entity.MetalEntity;
import com.billapp.billapp.Entity.StoneEntity;
import com.billapp.billapp.Repository.MetalRepository;
import com.billapp.billapp.Repository.StoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Meta;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MiscService {
    @Autowired
    StoneRepository stoneRepository;
    @Autowired
    MetalRepository metalRepository;


    public List<StoneEntity>getStones(){
        return stoneRepository.findAll();
    }
    public StoneEntity saveStone(StoneEntity save){
        return stoneRepository.save(save);
    }
    public List<MetalEntity> getAllMetal(){return metalRepository.findAll();}
    public MetalEntity saveMetal(MetalEntity metal){return metalRepository.save(metal);}
    public List<MetalEntity> saveALlMetal(List<MetalEntity> metal){return metalRepository.saveAll(metal);}
    public MetalEntity getAMetal(Long id){
        return metalRepository.getById(id);
    }
}
