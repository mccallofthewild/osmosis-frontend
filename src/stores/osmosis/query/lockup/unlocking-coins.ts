import { ObservableChainQuery, ObservableChainQueryMap } from '@keplr-wallet/stores/build/query/chain-query';
import { KVStore } from '@keplr-wallet/common';
import { ChainGetter } from '@keplr-wallet/stores/src/common/index';
import { AccountUnlockingCoins } from './types';
import { QueryResponse } from '@keplr-wallet/stores';
import { computed, makeObservable } from 'mobx';
import { CoinPretty, Dec } from '@keplr-wallet/unit';

export class ObservableQueryAccountUnlockingCoinsInner extends ObservableChainQuery<AccountUnlockingCoins> {
	constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter, bech32Address: string) {
		super(kvStore, chainId, chainGetter, `/osmosis/lockup/v1beta1/account_unlocking_coins/${bech32Address}`);

		makeObservable(this);
	}

	protected setResponse(response: Readonly<QueryResponse<AccountUnlockingCoins>>) {
		super.setResponse(response);

		const chainInfo = this.chainGetter.getChain(this.chainId);
		chainInfo.addUnknownCurrencies(...response.data.coins.map(c => c.denom));
	}

	@computed
	get unlockingCoins(): CoinPretty[] {
		if (!this.response) {
			return [];
		}

		const chainInfo = this.chainGetter.getChain(this.chainId);
		const result: CoinPretty[] = [];

		for (const currency of chainInfo.currencies) {
			const coinPrimitive = this.response.data.coins.find(c => c.denom === currency.coinMinimalDenom);
			if (coinPrimitive) {
				const pretty = new CoinPretty(currency, new Dec(coinPrimitive.amount));
				result.push(pretty);
			}
		}

		return result;
	}
}

export class ObservableQueryAccountUnlockingCoins extends ObservableChainQueryMap<AccountUnlockingCoins> {
	constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter) {
		super(kvStore, chainId, chainGetter, (bech32Address: string) => {
			return new ObservableQueryAccountUnlockingCoinsInner(this.kvStore, this.chainId, this.chainGetter, bech32Address);
		});
	}

	get(bech32Address: string): ObservableQueryAccountUnlockingCoinsInner {
		return super.get(bech32Address) as ObservableQueryAccountUnlockingCoinsInner;
	}
}
