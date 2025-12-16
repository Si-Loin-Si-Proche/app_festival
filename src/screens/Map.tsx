import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNativeZoomableView } from '@dudigital/react-native-zoomable-view';

import { COLORS, SPACING } from '../constants/theme';
import { IconName } from '../constants/icons';
import { MAP_POINTS, MapPoint, MAP_IMAGE_SOURCE } from '../constants/mapData';
import MapMarker from '../components/atoms/MapMarker';
import Typography from '../components/atoms/Typography';
import Icon from '../components/atoms/Icon';
import SectionHeader from '../components/molecules/SectionHeader';

const screen = Dimensions.get('window');
const IMAGE_RATIO = 6500 / 6200;

const FILTERS = [
  { id: 'all', label: 'Tous' },
  { id: 'scene', label: 'Scènes' },
  { id: 'food', label: 'Restauration' },
  { id: 'wc', label: 'WC' },
];

export default function MapScreen() {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const mapHeight = screen.width / IMAGE_RATIO;

  const displayedPoints = useMemo(() => {
    if (activeFilter === 'all') return MAP_POINTS;
    return MAP_POINTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleMapTap = () => {
    if (selectedPoint) {
      setSelectedPoint(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        title="Plan du Festival"
        showBackButton={true}
        showFavorite={false}
      />
      <View style={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={false}
            panEnabled={true}
            style={styles.zoomView}
            visualTouchFeedbackEnabled={false}
            onSingleTapAfter={handleMapTap}
          >
            <View
              style={{
                width: screen.width,
                height: mapHeight,
                backgroundColor: '#fff',
              }}
            >
              <Image
                source={MAP_IMAGE_SOURCE}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />

              {displayedPoints.map((point) => (
                <MapMarker
                  key={point.id}
                  point={point}
                  onPress={(p) => setSelectedPoint(p)}
                />
              ))}
            </View>
          </ReactNativeZoomableView>
        </View>

        {/* LES FILTRES */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const iconName = filter.id === 'all' ? 'filter' : filter.id;

              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                  ]}
                  onPress={() => setActiveFilter(filter.id)}
                  activeOpacity={0.8}
                >
                  {filter.id !== 'all' && (
                    <Icon
                      name={filter.id as any}
                      size={16}
                      color={COLORS.text}
                    />
                  )}

                  <Typography
                    variant="caption"
                    style={{
                      color: COLORS.text,
                      fontWeight: isActive ? 'bold' : 'normal',
                      marginLeft: filter.id !== 'all' ? 6 : 0,
                    }}
                  >
                    {filter.label}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* MODALE D'INFORMATION */}
      {selectedPoint && (
        <View style={styles.infoBox}>
          <View style={styles.infoContent}>
            <View style={styles.infoHeader}>
              <View
                style={[
                  styles.iconBadge,
                  { backgroundColor: selectedPoint.color },
                ]}
              >
                <Icon
                  name={selectedPoint.icon}
                  size={20}
                  color={COLORS.background}
                />
              </View>
              <Typography variant="h2" style={styles.title}>
                {selectedPoint.label}
              </Typography>
            </View>

            {selectedPoint.description && (
              <Typography variant="body" style={styles.description}>
                {selectedPoint.description}
              </Typography>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setSelectedPoint(null)}
            style={styles.closeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    zIndex: 9999,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    overflow: 'hidden',
  },
  zoomView: {
    flex: 1,
  },

  // --- FILTRES FLOTTANTS ---
  filterContainer: {
    position: 'absolute',
    top: SPACING.s,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 10,
  },
  filterContent: {
    paddingHorizontal: SPACING.m,
    alignItems: 'center',
    paddingRight: SPACING.m,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.text,
    marginRight: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  filterChipActive: {
    backgroundColor: COLORS.filtreSelected,
    color: '#000',
  },

  // --- MODALE ---
  infoBox: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  infoContent: {
    flex: 1,
    marginRight: SPACING.m,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
});
