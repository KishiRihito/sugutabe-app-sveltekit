<script lang="ts">
	import type { PageData } from './$types';
  import { page } from '$app/stores';
  import { Shadow } from 'svelte-loading-spinners';
  import logo from '$img/logo.png?enhanced'
  import ResultList from '$lib/components/ResultList.svelte';
  import Credit from "$lib/components/Credit.svelte";

  interface Query {
    count: number,
    lat?: number,
    lng?: number,
    name: string,
    range?: number,
    keyword: string,
    format: 'json' | 'xml',
  };

  // export let data: PageData;

  let queryInit = {// URLパラメータの初期値
    count: 100,
    name: '',
    keyword: '',
    format: 'json',
  };

  $: resultData = null;
  $: query = queryInit as Query;
  $: status = '条件を入力してボタンを押して下さい';
  $: isSearching = false;

  const requestURL = (query: Query): string => {
    let requestUrl;
    const key = $page.data.api_key;
    const proxyUrl = $page.data.proxy_url;
    const searchParams = new URLSearchParams(Object.entries(query));// key以外のパラメータを作成

    const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${key}&${searchParams.toString()}`;

    // 開発時はCORSプロキシサーバを追加
    $page.data.mode === 'development'
      ? requestUrl = proxyUrl + url
      : requestUrl = url;
    return requestUrl;
  };

  const searchShops = () => {
    isSearching = true;
    resultData = null;

    const getPositionCallback = async (position: GeolocationPosition): Promise<void> => {
      status = '';
      query.lat = position.coords.latitude;
      query.lng = position.coords.longitude;

      const requestUrl = requestURL(query);

      const response = await fetch(requestUrl, {
        method: 'GET',
      });
      resultData = await response.json().catch(console.error);
      console.log(resultData);
      isSearching = false;
    };

    const errorCallback = (positionError: any): void => {
      switch (positionError.code) {
        case 0:
          status = "原因不明のエラーが発生しました。";
          break;
        case 1:
          status = "位置情報の取得を許可して下さい。";
          break;
        case 2:
          status = "位置情報が取得できませんでした。電波状況が悪い可能性があります。";
          break;
        case 3:
          status = "位置情報の取得がタイムアウトしました。";
          break;
      }
    };

    if (!navigator.geolocation) {
      status = '現在地情報を取得することができませんでした';
    } else {
      status = '検索中です…';
      navigator.geolocation.getCurrentPosition(getPositionCallback, errorCallback);
    }
  };
</script>

<div class="search">
  <h1 class="logo">
    <enhanced:img
      src={logo}
      alt="スグ食べサーチ ロゴ"
    />
    <span class="u-sr-only">スグ食べサーチ</span>
  </h1>

  <form action="#">
    <div class="search-item">
      <label for="keywords" class="label">キーワード</label>
      <input type="text" bind:value={query.keyword} id="keywords" class="input" placeholder="&nbsp;">
    </div>
    <div class="search-item">
      <label for="shop-name" class="label">店舗名</label>
      <input type="text" bind:value={query.name} id="shop-name" class="input" placeholder="&nbsp;">
    </div>
    <div class="search-item">
      <label for="range" class="label">検索する範囲</label>
      <select bind:value={query.range} id="range" class="select">
        <option value="1">300m</option>
        <option value="2">500m</option>
        <option value="3" selected>1000m</option>
        <option value="4">2000m</option>
        <option value="5">3000m</option>
      </select>
    </div>
  </form>

  <button on:click={searchShops} type="button" class="button">検索する</button>
  <p class="status-text">{status}</p>

  <Credit />
</div>


<div class="result">
  {#if isSearching}
  <div class="spinner-wrap">
    <div class="spinner">
      <Shadow size="28" color="#bd3d2d" unit="px" duration="1s" />
    </div>
  </div>
  {/if}

  {#if resultData}
    <ResultList {resultData} />
  {/if}
</div>

<style lang="scss">
  .search {
    position: relative;
    z-index: 80;
    border-radius: 10px;
    padding: 27px 27px 30px;
    margin: 0 auto;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    background-color: rgba(255, 255, 255, 0.62);
    backdrop-filter: blur(4px);
  }

  .logo {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 13.33vw;

    @media screen and (min-width: 768px) {
      width: 102px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .search-item {
    & + & {
      margin-top: 0.375rem;
    }
  }

  .input {
    border-radius: 8px;
    border: solid 1px var(--color-gray);
    padding: 0.05rem 0.6rem;

    &:focus,
    &:focus-within,
    &:focus-visible {
      outline: solid 1px var(--color-red);
    }
  }

  .label {
    display: inline-block;
    min-width: 108px;
  }

  .select {
    position: relative;

    &::after {
      content: '';
      display: inline-block;
      width: 0.6875rem;
      height: 0.5rem;
      background-color: var(--color-red);
      clip-path: polygon(0 0, 100% 0%, 50% 100%);
    }
  }

  .button {
    display: inline-grid;
    place-items: center;
    margin: 24px 0 0;
    padding: 8px 12px;
    border-radius: 8px;
    border-width: 0;
    background-color: var(--color-red);
    color: var(--color-white);
    font-size: 1rem;
    touch-action: manipulation;
  }

  .status-text {
    margin-top: 0.375rem;
    min-height: 0.875rem;
    color: var(--color-red);
    font-size: 0.875rem;
    line-height: 1;
  }

  .result {
    position: relative;
    margin-top: 36px;
  }

  .spinner-wrap {
    display: flex;
    justify-content: center;
  }

  .spinner {
    display: inline-block;
    margin: 16px;
  }
</style>
