package com.billapp.billapp.controller;

import com.billapp.billapp.Entity.MetalEntity;
import com.billapp.billapp.Entity.StoneEntity;
import com.billapp.billapp.Service.MiscService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/misc")
@RestController
public class MiscController {
    @Autowired
    MiscService miscService;

    @GetMapping("/getStone")
    public List<StoneEntity> getStoneList(){
        return miscService.getStones();
    }
    @PostMapping("/saveStone")
    public StoneEntity saveStone(@RequestBody StoneEntity stoneEntity){
        return miscService.saveStone(stoneEntity);
    }

    @GetMapping("/getAllMetal")
    public List<MetalEntity>getMetal(){
        return miscService.getAllMetal();
    }

    @PostMapping("/saveMetal")
    public MetalEntity saveMetal(@RequestBody MetalEntity metal){
        return miscService.saveMetal(metal);
    }

    @GetMapping("/getAmetal/{id}")
    public MetalEntity getAMetal(@RequestParam Long id){
        return miscService.getAMetal(id);
    }
}
