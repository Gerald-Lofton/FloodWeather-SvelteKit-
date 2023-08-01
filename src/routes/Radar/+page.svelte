<script>
    import 'leaflet/dist/leaflet.css'; //Don't forget to declare leaflet css
    import {Map, TileLayer, Marker, Popup} from 'svelte-map-leaflet'

    const mapOptions = { center: [38.627003,-90.199402], zoom: 10};
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const markerLatLng = [38.627003,-90.199402];
    const popupMessage = "St. Louis, Missouri";
</script>
<slot />

<br>

<div class="map">
    <Map options={mapOptions}>
        <TileLayer url={tileUrl}></TileLayer>
        <Marker latLng={markerLatLng}>
            <Popup>{popupMessage}</Popup>
        </Marker>
    </Map>
</div>

<style>
    .map{
        height: 400px;
        width: 400px;
    }
</style>