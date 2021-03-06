﻿import { LayerStubBase } from "../LayerStubBase.js";
import { Layer } from "../Layer.js";
import { Building } from "../H_building/Building.js";
import { Random } from "../../Util/Random.js";
import { LayerEnum } from "../LayerStub.js";

export class BuildingStub extends LayerStubBase {
    get layer() { return LayerEnum.Building; }

    generateFullData(): Layer {
        return new Building(this, new Random(this.randomState));
    }
}