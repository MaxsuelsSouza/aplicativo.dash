import { useState } from 'react';
import SearchModal from '@/components/SearchModal';

export default function useSearchModal(initialValue = '') {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(initialValue);

  const openSearch = () => setVisible(true);
  const closeSearch = () => setVisible(false);

  const Search = () => (
    <SearchModal
      visible={visible}
      value={search}
      onChangeText={setSearch}
      onRequestClose={closeSearch}
    />
  );

  return {
    search,
    setSearch,
    openSearch,
    closeSearch,
    visible,
    SearchModal: Search,
  };
}
