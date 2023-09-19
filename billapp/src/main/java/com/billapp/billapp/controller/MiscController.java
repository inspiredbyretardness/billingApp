package com.billapp.billapp.controller;

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
}
