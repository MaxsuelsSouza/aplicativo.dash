import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: '#1E1F28',
    paddingTop: 60,
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E1F28',
    zIndex: 10,
  },
  locationText: {
    color: '#fff',
    marginLeft: 8,
    marginRight: 12,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#2b2c34',
    color: '#fff',
  },
  carousel: {
    paddingVertical: 16,
  },
  carouselCard: {
    width: 140,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2b2c34',
  },
  carouselImage: {
    width: '100%',
    height: 80,
  },
  carouselTitle: {
    color: '#fff',
    padding: 8,
    fontSize: 14,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  column: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#2b2c34',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 4,
  },
  productImage: {
    width: '100%',
    height: '70%',
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    color: '#fff',
    fontSize: 14,
  },
  productPrice: {
    color: '#a287ff',
    marginTop: 4,
  },
});
