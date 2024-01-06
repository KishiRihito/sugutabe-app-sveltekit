<script lang="ts">
  export let resultData;

  let resultShopArray = resultData.results.shop;

  let currentPage = 1;
  let itemsPerPage = 10;

  $: paginatedData = resultShopArray ? resultShopArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : null;
  $: totalPagesArray = Math.ceil(resultShopArray.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    currentPage = pageNumber;
    updateCurrent(pageNumber);
  };

  const isCurrent = (pageNumber: number): string => {
    return pageNumber === currentPage ? 'is-current' : '';
  };

  const updateCurrent = (pageNumber: number) => {
    const paginationButtons = document.querySelectorAll('.pagination');
    paginationButtons.forEach((button, index) => {
      if (index + 1 === pageNumber) {
        button.classList.add('is-current');
      } else {
        button.classList.remove('is-current');
      }
    });
  };
</script>

{#if resultShopArray.length}
<h2 class="result-status-text">{resultShopArray.length}件の店舗が見つかりました</h2>
{:else}
<h2 class="result-status-text">該当する店舗は見つかりませんでした</h2>
{/if}

{#if resultShopArray.length > 10}
<ul class="pagination-list">
  {#each Array(totalPagesArray).keys() as page}
  <li><button type="button" on:click={() => paginate(page + 1)} class="pagination {isCurrent(page + 1)}">{page + 1}</button></li>
  {/each}
</ul>
{/if}

<ul class="result-list">
  {#each paginatedData as shop}
  <li class="result-card">
    <a href="{shop.urls.pc}" aria-label="{shop.name} ホットペッパーグルメ" class="result-card-inner" target="_blank">
      <div class="result-card-img"><img src="{shop?.photo.pc.l}" alt="{shop.name} ロゴ画像"></div>
      <div class="result-card-info">
        <p class="result-card-infoName">{shop.name}</p>
        <p>{shop?.catch}</p>
      </div>
      <dl class="result-card-list">
        <div class="result-card-listItem">
          <dt>営業時間</dt>
          <dd>{shop?.open}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>定休日</dt>
          <dd>{shop?.close}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>住所</dt>
          <dd>{shop?.address}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>食べ放題</dt>
          <dd>{shop?.free_food}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>飲み放題</dt>
          <dd>{shop?.free_drink}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>個室</dt>
          <dd>{shop?.private_room}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>禁煙席</dt>
          <dd>{shop?.non_smoking}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>駐車場</dt>
          <dd>{shop?.parking}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>その他設備</dt>
          <dd>{shop?.other_memo}</dd>
        </div>
        <div class="result-card-listItem">
          <dt>23時以降も営業</dt>
          <dd>{shop?.midnight}</dd>
        </div>
      </dl>
    </a>
  </li>
  {/each}
</ul>

<style lang="scss">
  .pagination-list {
    display: flex;
    gap: 0 12px;
    margin-top: 0.375rem;

    > li {
      list-style-type: none;
    }
  }

  .pagination {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;

    &.is-current {
      color: var(--color-red);
      font-weight: 600;
    }
  }

  .result-status-text {
    font-size: 1.25rem;

    @media screen and (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .result-list {
    margin: 18px 0 36px;
  }

  .result-card {
    display: block;
    border-radius: 12px;
    list-style-type: none;
    background-color: rgba(255, 255, 255, 0.62);
    backdrop-filter: blur(4px);

    & + & {
      margin-top: 30px;
    }
  }

  .result-card-inner {
    display: inline-grid;
    grid-template-areas:
    "area2"
    "area1"
    "area3";
    width: 100%;
    height: 100%;
    border-radius: 12px;
    gap: 10px 0;
    padding: 24px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    text-decoration: none;
    font-size: 0.8125rem;
    color: var(--color-black);

    @media screen and (min-width: 768px) {
      grid-template-areas:
      "area1 area2"
      "area1 area3";
      grid-template-columns: max-content 1fr;
      gap: 0 24px;
      padding: 36px;
      transition: box-shadow 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    }

    &:hover,
    &:active,
    &:visited {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      @media screen and (min-width: 768px) {
        box-shadow: rgba(189, 61, 45, 0.24) 0px 3px 12px;
      }
    }
  }

  .result-card-img {
    grid-area: area1;
    display: block;
    border-radius: 6px;
    width: 100%;
    height: auto;
    overflow: hidden;

    @media screen and (min-width: 768px) {
      width: 200px;
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .result-card-info {
    grid-area: area2;
    margin-bottom: 0.75rem;
    padding-bottom: 0.375rem;
    font-size: 0.8125rem;
    border-bottom: solid 2px var(--color-red);

    @media screen and (min-width: 768px) {
      margin-bottom: 0;
      font-size: 1rem;
    }
  }

  .result-card-infoName {
    font-size: 1.375rem;
    font-weight: bold;
    margin-bottom: 0;
  }

  .result-card-list {
    grid-area: area3;
    margin-top: 12px;
  }

  .result-card-listItem {
    display: flex;
    gap: 0 0.875rem;
    padding: 0.5rem 0.25rem;

    > dt {
      flex-shrink: 0;
      align-self: start;
      display: block;
      width: min(20vw, 100px);
    }

    > dd {
      align-self: start;
    }

    &:not(:last-of-type) {
      border-bottom: dotted 1px var(--color-gray);
    }
  }
</style>
