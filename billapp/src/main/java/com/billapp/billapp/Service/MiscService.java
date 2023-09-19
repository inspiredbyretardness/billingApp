package com.billapp.billapp.Service;


import com.billapp.billapp.Entity.StoneEntity;
import com.billapp.billapp.Repository.StoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MiscService {
    @Autowired
    StoneRepository stoneRepository;


    public List<StoneEntity>getStones(){
        return stoneRepository.findAll();
    }
    public StoneEntity saveStone(StoneEntity save){
        return stoneRepository.save(save);
    }
}
