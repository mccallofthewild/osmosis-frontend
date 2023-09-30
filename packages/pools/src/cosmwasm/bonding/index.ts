import { Dec, Int } from "@keplr-wallet/unit";
import {
  calc_get_token_in_by_token_out,
  calc_get_token_out_by_token_in,
} from "src/cosmwasm/bonding/pkg/bonding_pool_bindings";
import { calc_spot_price } from "src/cosmwasm/bonding/pkg/cw-bonding-pool";

import { validateDenoms } from "../../errors";
import { BasePool } from "../../interface";
import { Quote, RoutablePool, Token } from "../../router";
import { CosmwasmPoolRaw } from "../types";

type Uint128 = string;

type CurveType =
  | {
      constant: {
        scale: number;
        value: Uint128;
      };
    }
  | {
      linear: {
        scale: number;
        slope: Uint128;
      };
    }
  | {
      square_root: {
        scale: number;
        slope: Uint128;
      };
    }
  | {
      square_root_cubed: {
        scale: number;
        slope: Uint128;
      };
    }
  | {
      cube_root_squared: {
        scale: number;
        slope: Uint128;
      };
    };

interface CurveState {
  decimals: DecimalPlaces;
  reserve: Uint128;
  reserve_denom: string;
  supply: Uint128;
  supply_denom: string;
}
interface DecimalPlaces {
  reserve: number;
  supply: number;
}

interface CwBondingInstantiateMsg {
  curve_type: CurveType;
  max_supply: Uint128;
  reserve_decimals: number;
  reserve_denom: string;
  supply_decimals: number;
  supply_subdenom: string;
  test_mode?: boolean | null;
}

export class BondingPool implements BasePool, RoutablePool {
  get type() {
    return "bonding" as const;
  }

  get id(): string {
    return this.raw.pool_id;
  }

  get swapFee(): Dec {
    return new Dec(0);
  }

  get exitFee(): Dec {
    // TODO; confirm if there is no liquidity exchange fee
    return new Dec(0);
  }

  get poolAssetDenoms(): string[] {
    return this.raw.tokens.map(({ denom }) => denom);
  }

  get poolAssets(): { denom: string; amount: Int }[] {
    return this.raw.tokens.map(({ denom, amount }) => ({
      denom,
      amount: new Int(amount),
    }));
  }

  constructor(readonly raw: CosmwasmPoolRaw) {}

  protected get instantiateMsg(): CwBondingInstantiateMsg {
    const config: CwBondingInstantiateMsg = JSON.parse(
      this.raw.instantiate_msg
    );
    return config;
  }
  protected get curveState(): CurveState {
    const config = this.instantiateMsg;
    const curveState: CurveState = {
      decimals: {
        reserve: config.reserve_decimals,
        supply: config.supply_decimals,
      },
      reserve: "0",
      reserve_denom: config.reserve_denom,
      supply: "0",
      supply_denom: `factory/${this.raw.contract_address}/${config.supply_subdenom}`,
    };
    return curveState;
  }

  // Interface: BasePool

  hasPoolAsset(denom: string): boolean {
    return this.raw.tokens.some(
      ({ denom: tokenDenom }) => tokenDenom === denom
    );
  }

  getSpotPriceInOverOut(tokenInDenom: string, tokenOutDenom: string): Dec {
    validateDenoms(this, tokenInDenom, tokenOutDenom);

    const out: string = calc_spot_price({
      quote_asset_denom: tokenOutDenom,
      base_asset_denom: tokenInDenom,
      curve_state: this.curveState,
      curve_type: this.instantiateMsg.curve_type,
    });

    return new Dec(out);
  }
  getSpotPriceOutOverIn(tokenInDenom: string, tokenOutDenom: string): Dec {
    validateDenoms(this, tokenInDenom, tokenOutDenom);

    const out: string = calc_spot_price({
      quote_asset_denom: tokenInDenom,
      base_asset_denom: tokenOutDenom,
      curve_state: this.curveState,
      curve_type: this.instantiateMsg.curve_type,
    });

    return new Dec(out);
  }
  getSpotPriceInOverOutWithoutSwapFee(
    tokenInDenom: string,
    tokenOutDenom: string
  ): Dec {
    return this.getSpotPriceInOverOut(tokenInDenom, tokenOutDenom);
  }
  getSpotPriceOutOverInWithoutSwapFee(
    tokenInDenom: string,
    tokenOutDenom: string
  ): Dec {
    return this.getSpotPriceOutOverIn(tokenInDenom, tokenOutDenom);
  }

  getLimitAmountByTokenIn(denom: string): Int {
    const amount = this.raw.tokens.find(
      ({ denom: tokenDenom }) => tokenDenom === denom
    )?.amount;
    if (!amount) throw new Error("Invalid denom");
    return new Int(amount);
  }

  async getTokenOutByTokenIn(
    tokenIn: Token,
    tokenOutDenom: string
  ): Promise<Quote> {
    validateDenoms(this, tokenIn.denom, tokenOutDenom);

    const quote = calc_get_token_out_by_token_in({
      token_in: {
        amount: tokenIn.amount.toString(),
        denom: tokenIn.denom,
      },
      token_out_denom: tokenOutDenom,
      swap_fee: this.swapFee.toString(),
      curve_state: this.curveState,
      curve_type: this.instantiateMsg.curve_type,
    });

    return {
      beforeSpotPriceInOverOut: new Dec(quote["before_spot_price_in_over_out"]),
      beforeSpotPriceOutOverIn: new Dec(quote["before_spot_price_out_over_in"]),
      afterSpotPriceInOverOut: new Dec(quote["after_spot_price_in_over_out"]),
      afterSpotPriceOutOverIn: new Dec(quote["after_spot_price_out_over_in"]),
      effectivePriceInOverOut: new Dec(quote["effective_price_in_over_out"]),
      effectivePriceOutOverIn: new Dec(quote["effective_price_out_over_in"]),
      priceImpactTokenOut: new Dec(quote["price_impact_token_out"]),
      amount: new Int(quote["amount"]),
    };
  }

  async getTokenInByTokenOut(
    tokenOut: Token,
    tokenInDenom: string
  ): Promise<Quote> {
    validateDenoms(this, tokenOut.denom, tokenInDenom);

    const quote = calc_get_token_in_by_token_out({
      token_out: {
        amount: tokenOut.amount.toString(),
        denom: tokenOut.denom,
      },
      token_in_denom: tokenInDenom,
      swap_fee: this.swapFee.toString(),
      curve_state: this.curveState,
      curve_type: this.instantiateMsg.curve_type,
    });

    return {
      beforeSpotPriceInOverOut: new Dec(quote["before_spot_price_in_over_out"]),
      beforeSpotPriceOutOverIn: new Dec(quote["before_spot_price_out_over_in"]),
      afterSpotPriceInOverOut: new Dec(quote["after_spot_price_in_over_out"]),
      afterSpotPriceOutOverIn: new Dec(quote["after_spot_price_out_over_in"]),
      effectivePriceInOverOut: new Dec(quote["effective_price_in_over_out"]),
      effectivePriceOutOverIn: new Dec(quote["effective_price_out_over_in"]),
      priceImpactTokenOut: new Dec(quote["price_impact_token_out"]),
      amount: new Int(quote["amount"]),
    };
  }
}
