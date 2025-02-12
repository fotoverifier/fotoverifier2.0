export interface ExifData {
  exif_data: any;
  software_modify: string | undefined;
  modify_date: string | undefined;
  original_date: {
    original_date: string | undefined;
    create_date: string | undefined;
  };
  camera_information: {
    make: string | undefined;
    model: string | undefined;
    exposure: string | undefined;
    aperture: string | undefined;
    focal_length: string | undefined;
    iso_speed: string | undefined;
    flash: string | undefined;
    camera_image: {
      image_results: {
        original: string;
      }[];
    };
  };
  gps_location: {
    latitude: string | null;
    longitude: string | null;
  };
  author_copyright: {
    author: string | undefined;
    copyright_tag: string | undefined;
    profile_copyright: string | undefined;
    author_image: {
      image_results: {
        original: string;
      }[];
    };
  };
}

export interface SearchResult {
  title: string | undefined;
  redirect_link: string | undefined;
}

export interface Result {
  exif_data: any;
  jpeg_ghost_result: string;
  reverse_image_search_results: any;
}

export interface Tagging {
  tag: string;
}
