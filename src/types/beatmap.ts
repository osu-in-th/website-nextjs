export type Cursor = {
    approved_date: number;
    id: number;
    string: string;
}

export interface SearchFilter {
    e?: string;
    c?: string;
    g?: string;
    l?: string;
    m?: string;
    nsfw?: string;
    played?: boolean;
    q?: string;
    r?: string;
    sort?: string;
    s?: string;
    cursor_string?: string;
}

export type Beatmap = {
    accuracy: number;
    ar: number;
    beatmapset_id: number;
    bpm: number;
    checksum: string;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number
    cs: number;
    deleted_at: string | null;
    difficultyrating: number;
    drain: number;
    hit_length: number;
    id: number;
    is_scoreable: boolean;
    last_updated: string;
    max_combo: number;
    mode: string;
    passcount: number;
    playcount: number;
    ranked: number;
    status: string;
    total_length: number;
    url: string;
    user_id: number;
    version: string;
    [key: string]: any;
}

export type BeatmapSet = {
    artist: string;
    artist_unicode: string;
    availability: {
        download_disabled: boolean;
        more_information?: string;
    };
    beatmaps: Beatmap[];
    bpm: number;
    can_be_hyped: boolean;
    covers: {
        cover: string;
        "cover@2x": string;
        card: string;
        "card@2x": string;
        list: string;
        "list@2x": string;
        slimcover: string;
        "slimcover@2x": string;
    };
    creator: string;
    deleted_at: string | null;
    discussion_enabled: boolean;
    discussion_locked: boolean;
    favourite_count: number;
    genre_id: number;
    has_favourited: boolean;
    hype: any;
    id: number;
    is_scoreable: boolean;
    last_updated: string;
    legacy_thread_url: string;
    nominations_summary: {
        current: number;
        eligible_main_rulesets: string[];
        required_meta: {
            main_ruleset: number;
            non_main_ruleset: number;
        };
    };
    nsfw: boolean;
    offset: number;
    play_count: number;
    preview_url: string;
    ranked: number;
    ranked_date: string;
    rating: number;
    source: string;
    spotlight: boolean;
    status: string;
    storyboard: boolean;
    submitted_date: string;
    tags: string;
    title: string;
    title_unicode: string;
    track_id: number;
    user_id: number;
    video: boolean;
    [key: string]: any;
}

export interface SearchResult {
    beatmapsets: BeatmapSet[];
    cursor: Cursor;
    cursor_string: string;
    total: number;
    error: any;
    recommended_difficulty: number;
    search: SearchFilter;
    [key: string]: any;
}